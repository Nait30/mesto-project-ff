import { config, putLike, deleteLike, profileId } from "./api";

function createCard(
  cardData,
  removeCardFunc,
  likeCardFunc,
  showCardFunc,
  profileId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const image = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardName = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".likes__counter");

  image.src = cardData.link;

  if (cardData.alt != undefined) {
    image.alt = cardData.alt;
  }

  cardName.textContent = cardData.name;

  cardElement.setAttribute("data-card_id", cardData._id);

  updateLikeStatus(cardData, likeCounter, likeButton, profileId);

  if (cardData.owner._id === profileId) {
    deleteButton.addEventListener("click", ()=>{
      removeCardFunc(cardElement);
    });
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener("click", likeCardFunc);

  image.addEventListener("click", showCardFunc);

  return cardElement;
}






function updateLikeStatus(cardData, counter, likeButton, profileId) {
  counter.textContent = countLikes(cardData.likes);
  if (
    cardData.likes.find((item) => {
      return item._id == profileId;
    })
  ) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }
}

function handleLikeCard(evt) {
  evt.preventDefault();
  const likeButton = evt.target.closest(".card__like-button");
  const likedCard = evt.target.closest(".card");
  const likeCounter = likedCard.querySelector(".likes__counter");
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    putLike(config, likedCard.getAttribute("data-card_id")).then((cardData) => {
      updateLikeStatus(cardData, likeCounter, likeButton, profileId);
    });
  } else {
    deleteLike(config, likedCard.getAttribute("data-card_id")).then(
      (cardData) => {
        updateLikeStatus(cardData, likeCounter, likeButton, profileId);
      }
    );
  }
}

function countLikes(likes) {
  return likes.length;
}

export { createCard, handleLikeCard};
