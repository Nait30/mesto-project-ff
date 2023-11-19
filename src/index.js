import './index.css';
import {initialCards} from './components/cards.js'
import {createCard, addCard, deleteCard} from './components/card.js'
import {openPopup, changeProfile, handleOpenPopupProfile, handleAddPlace, addPlace, closePopup} from './components/modal.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileForm = document.forms['edit-profile'];
const placeAddButton = document.querySelector('.profile__add-button');
const placeForm = document.forms['new-place'];
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

initialCards.forEach((card) => {
  addCard(card, deleteCard);
})


profileEditButton.addEventListener('click', handleOpenPopupProfile)

profileForm.addEventListener('submit', changeProfile);

placeAddButton.addEventListener('click', handleAddPlace);

placeForm.addEventListener('submit', addPlace);