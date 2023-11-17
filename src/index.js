import './index.css';
import {initialCards} from './components/cards.js'
import {createCard, addCard, deleteCard} from './components/card.js'
import {openPopup, changeProfile, handleOpenPopupProfile, handleAddPlace, addPlace} from './components/modal.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileForm = document.forms['edit-profile'];
const placeAddButton = document.querySelector('.profile__add-button');
const placeForm = document.forms['new-place'];



for (let i = 0; i < 6; i++) {
  addCard(initialCards[i], deleteCard);
}

profileEditButton.addEventListener('click', handleOpenPopupProfile)

profileForm.addEventListener('submit', changeProfile);

placeAddButton.addEventListener('click', handleAddPlace);

placeForm.addEventListener('submit', addPlace);