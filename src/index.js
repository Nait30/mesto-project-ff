import './index.css';
import {initialCards} from './components/cards.js'
import {createCard, addCard, removeCard, showCards} from './components/card.js'
import {openPopup, changeProfile, handleOpenPopupProfile, handleAddPlace, addPlace, closePopup, handleDeletePlace, handleChangeAvatar, changeAvatar, profileImage} from './components/modal.js';
import {enableValidation, popupValidationConfig } from './components/validation.js';
import { getProfile, config, updateProfile, getCards, showProfileChanges } from './components/api.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileForm = document.forms['edit-profile'];
const avatarForm = document.forms['new-avatar'];
const placeAddButton = document.querySelector('.profile__add-button');
const placeForm = document.forms['new-place'];
const popups = document.querySelectorAll('.popup');
const cardDeleteButton = document.querySelector('.button_delete-card');
let profileId;



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

getCards(config);
getProfile(config);


Promise.all([getCards(config), getProfile(config)])
  .then(([cards, profileData])=>{
    profileId = profileData._id;
    showCards(addCard, handleDeletePlace, cards, profileId)
    updateProfile(profileData);
  })


profileEditButton.addEventListener('click', handleOpenPopupProfile)

profileForm.addEventListener('submit', changeProfile);

profileImage.addEventListener('click', handleChangeAvatar);

placeAddButton.addEventListener('click', handleAddPlace);

placeForm.addEventListener('submit', addPlace);

cardDeleteButton.addEventListener('click', removeCard);

avatarForm.addEventListener('submit', ()=>{
  changeAvatar(config)
})

enableValidation(popupValidationConfig); 

export{profileId}


