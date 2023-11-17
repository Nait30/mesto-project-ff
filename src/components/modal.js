import {createCard, addCard, deleteCard} from './card.js'

const profilePopup = document.querySelector('.popup_type_edit');
const profileInputName = profilePopup.querySelector('.popup__input_type_name');
const profileInputDescription = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const inputImgLink = document.querySelector('.popup__input_type_url');
const inputImgName = document.querySelector('.popup__input_type_card-name');
const imgPopup = document.querySelector('.popup_type_image');

function openPopup(popupForOpen) {
  popupForOpen.addEventListener("click", handleClosePopup);

  document.addEventListener("keydown", handleClosePopup);

  popupForOpen.classList.add('popup_is-opened');
}

function handleOpenPopupProfile(evt){
  profileInputName.value = profileTitle.textContent;
  profileInputDescription.value = profileDescription.textContent;
  openPopup(profilePopup);
}

function handleClosePopup (evt){
  const popup = document.querySelector(".popup_is-opened");
  const popupCloseBtn = popup.querySelector(".popup__close");
  if (
    evt.target === popup ||
    evt.target === popupCloseBtn ||
    evt.key === "Escape"
  ) {
    closePopup(popup);
    popup.removeEventListener("click", handleClosePopup);
    document.removeEventListener("keydown", handleClosePopup);
  }
}

function closePopup(popupForClose) {
  popupForClose.classList.remove("popup_is-opened");
}

function changeProfile(evt){
  evt.preventDefault();
  profileTitle.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closePopup(profilePopup);
}

function handleAddPlace(evt) {
  inputImgLink.value = '';
  inputImgName.value = '';
  openPopup(popupAddNewCard);
}

function addPlace(evt){
  evt.preventDefault();
  const newPlace = {
    name: inputImgName.value,
    link: inputImgLink.value
  };
  addCard(newPlace, deleteCard);
  closePopup(popupAddNewCard);
}

function hsndleShowCard(evt){
  const card = evt.target.closest('.card');
  const img = card.querySelector('.card__image');
  const bigImg = imgPopup.querySelector('.popup__image');
  const caption = imgPopup.querySelector('.popup__caption');
  const cardName = card.querySelector('.card__title');
  bigImg.alt = img.alt;
  bigImg.src = img.src;
  caption.textContent = cardName.textContent;
  openPopup(imgPopup);
}

export { openPopup, changeProfile,handleClosePopup, handleOpenPopupProfile, handleAddPlace, addPlace, hsndleShowCard };
