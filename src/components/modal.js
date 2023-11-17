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
const bigImg = imgPopup.querySelector('.popup__image');
const caption = imgPopup.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup')


popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
  })
})

function openPopup(popupForOpen) {
  document.addEventListener("keydown", handleClosePopupPress);

  popupForOpen.classList.add('popup_is-opened');
}

function handleOpenPopupProfile(evt){
  profileInputName.value = profileTitle.textContent;
  profileInputDescription.value = profileDescription.textContent;
  openPopup(profilePopup);
}

function handleClosePopupPress (evt){
  const popup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}


function closePopup(popupForClose) {
  popupForClose.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleClosePopupPress);
}

function changeProfile(evt){
  evt.preventDefault();
  profileTitle.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closePopup(profilePopup);
}

function handleAddPlace(evt) {
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
  evt.target.reset();
}

function handleShowCard(evt){
  const card = evt.target.closest('.card');
  const img = card.querySelector('.card__image');
  const cardName = card.querySelector('.card__title');
  bigImg.alt = img.alt;
  bigImg.src = img.src;
  caption.textContent = cardName.textContent;
  openPopup(imgPopup);
}

export { openPopup, changeProfile, handleOpenPopupProfile, handleAddPlace, addPlace, handleShowCard };
