function createCard(cardData, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const image = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  const cardName = cardElement.querySelector('.card__title');

  image.src = cardData.link;
  
  if (cardData.alt != undefined) {
    image.alt = cardData.alt;
  }

  cardName.textContent = cardData.name;

  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

function addCard(cardData, deleteCard) {
  document.querySelector('.places__list').append(createCard(cardData, deleteCard));
}

// @todo: Функция удаления карточки

function deleteCard(event) {
  const cardForDel = event.target.closest('.card');
  cardForDel.remove();
}

export {createCard, addCard, deleteCard};