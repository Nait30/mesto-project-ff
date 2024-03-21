import './index.css';
import {initialCards} from './components/cards.js'
import {createCard, addCard, removeCard, showCards} from './components/card.js'
import {openPopup, changeProfile, handleOpenPopupProfile, handleAddPlace, addPlace, closePopup, handleDeletePlace} from './components/modal.js';
import {enableValidation, popupValidationConfig } from './components/validation.js';
import { getProfile, config, updateProfile, getCards, showProfileChanges } from './components/api.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileForm = document.forms['edit-profile'];
const placeAddButton = document.querySelector('.profile__add-button');
const placeForm = document.forms['new-place'];
const popups = document.querySelectorAll('.popup');
const cardDeleteButton = document.querySelector('.button_delete-card');



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

showCards(config, addCard, handleDeletePlace);


showProfileChanges(config);


profileEditButton.addEventListener('click', handleOpenPopupProfile)

profileForm.addEventListener('submit', changeProfile);

placeAddButton.addEventListener('click', handleAddPlace);

placeForm.addEventListener('submit', addPlace);

cardDeleteButton.addEventListener('click', removeCard);

enableValidation(popupValidationConfig); 


