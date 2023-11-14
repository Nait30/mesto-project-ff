import './index.css';
import {initialCards} from './components/cards.js'
import {createCard, addCard, deleteCard} from './components/card.js'
import {openPopup} from './components/popup.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');

for (let i = 0; i < 6; i++) {
  addCard(initialCards[i], deleteCard);
}

profileEditButton.addEventListener('click', ()=>{
  openPopup(profilePopup);
})



