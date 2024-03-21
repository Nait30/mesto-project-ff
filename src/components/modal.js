import { createCard, addCard, removeCard } from "./card.js";
import { checkInputValidity, popupValidationConfig } from "./validation.js";
import {
  submitProfileChanges,
  config,
  updateProfile,
  showProfileChanges,
  postCard,
} from "./api.js";

const profilePopup = document.querySelector(".popup_type_edit");
const profileInputName = profilePopup.querySelector(".popup__input_type_name");
const profileInputDescription = profilePopup.querySelector(
  ".popup__input_type_description"
);
const popupDeleteCard = document.querySelector(".popup_card_delete");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const inputImgLink = document.querySelector(".popup__input_type_url");
const inputImgName = document.querySelector(".popup__input_type_card-name");
const imgPopup = document.querySelector(".popup_type_image");
const bigImg = imgPopup.querySelector(".popup__image");
const caption = imgPopup.querySelector(".popup__caption");

function openPopup(popupForOpen) {
  document.addEventListener("keydown", handleEscapeKey);

  popupForOpen.classList.add("popup_is-opened");
}

function handleOpenPopupProfile(evt) {
  profileInputName.value = profileTitle.textContent;
  profileInputDescription.value = profileDescription.textContent;
  openPopup(profilePopup);
  const formElement = profilePopup.querySelector(".popup__form");
  const inputElements = formElement.querySelectorAll(".popup__input");
  inputElements.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement, popupValidationConfig);
  });
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

function closePopup(popupForClose) {
  popupForClose.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function changeProfile(evt) {
  evt.preventDefault();
  submitProfileChanges(config, {
    name: profileInputName.value,
    about: profileInputDescription.value,
  }).then((profileData) => {
    closePopup(profilePopup);
    updateProfile(profileData);
  });
}

function handleAddPlace() {
  openPopup(popupAddNewCard);
}

function handleDeletePlace(evt) {
  evt.preventDefault();
  const card = evt.target.closest(".card");
  popupDeleteCard.setAttribute('data-card_id', card.getAttribute('data-card_id'))
  openPopup(popupDeleteCard);
}

function addPlace(evt) {
  evt.preventDefault();
  const newPlace = {
    name: inputImgName.value,
    link: inputImgLink.value,
  };
  postCard(config, newPlace).then((cardData) => {
    addCard(cardData, removeCard);
    closePopup(popupAddNewCard);
    evt.target.reset();
  });
}

function handleShowCard(evt) {
  const card = evt.target.closest(".card");
  const img = card.querySelector(".card__image");
  const cardName = card.querySelector(".card__title");
  bigImg.alt = img.alt;
  bigImg.src = img.src;
  caption.textContent = cardName.textContent;
  openPopup(imgPopup);
}

export {
  openPopup,
  changeProfile,
  handleOpenPopupProfile,
  handleAddPlace,
  addPlace,
  handleShowCard,
  closePopup,
  profileTitle,
  profileDescription,
  handleDeletePlace,
  popupDeleteCard
};
