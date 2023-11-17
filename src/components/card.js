import {hsndleShowCard} from './modal';

function createCard(cardData, deleteCard, likeCardFunc) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const image = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  const cardName = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');

  image.src = cardData.link;
  
  if (cardData.alt != undefined) {
    image.alt = cardData.alt;
  }

  cardName.textContent = cardData.name;

  deleteButton.addEventListener('click', deleteCard);

  likeButton.addEventListener('click', likeCardFunc);

  image.addEventListener('click', hsndleShowCard);

  return cardElement;
}

function addCard(cardData, deleteCard) {
  document.querySelector('.places__list').prepend(createCard(cardData, deleteCard, likeCard));
}

// @todo: Функция удаления карточки

function deleteCard(event) {
  const cardForDel = event.target.closest('.card');
  cardForDel.remove();
}

function likeCard(evt){
  const buttonForLike = evt.target.closest('.card__like-button');
  buttonForLike.classList.toggle('card__like-button_is-active');
}



export {createCard, addCard, deleteCard};