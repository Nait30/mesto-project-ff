import "./index.css";
import {
  createCard, handleLikeCard
} from "./components/card.js";
import {
  openPopup,
  closePopup
} from "./components/modal.js";
import {
  enableValidation,
  popupValidationConfig,
  resetValidationErrors
} from "./components/validation.js";
import {
  getProfile,
  config,
  getCards,
  submitProfileChanges,
  postCard,
  deleteCard,
  submitAvatar
} from "./components/api.js";
const profilePopup = document.querySelector(".popup_type_edit");
const profileInputName = profilePopup.querySelector(".popup__input_type_name");
const profileInputDescription = profilePopup.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileForm = document.forms["edit-profile"];
const avatarForm = document.forms["new-avatar"];
const placeAddButton = document.querySelector(".profile__add-button");
const placeForm = document.forms["new-place"];
const popups = document.querySelectorAll(".popup");
const cardDeleteButton = document.querySelector(".button_delete-card");
const placesList = document.querySelector(".places__list");
const profilePopupButton = profilePopup.querySelector(".popup__button");
const popupChangeAvatar = document.querySelector(".popup_type_change-avatar");
const popupChangeAvatarButton =
  popupChangeAvatar.querySelector(".popup__button");
const inputNewAvatar = document.querySelector(".popup__input_type_avatar-url");
const profileImage = document.querySelector(".profile__image");
const popupDeleteCard = document.querySelector(".popup_card_delete");
const popupDeleteCardButton = popupDeleteCard.querySelector(".popup__button");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const popupAddNewCardButton = popupAddNewCard.querySelector(".popup__button");
const inputImgLink = document.querySelector(".popup__input_type_url");
const inputImgName = document.querySelector(".popup__input_type_card-name");
const imgPopup = document.querySelector(".popup_type_image");
const bigImg = imgPopup.querySelector(".popup__image");
const caption = imgPopup.querySelector(".popup__caption");
let cardForDelete;
let profileId;


function addCard(cardData, removeCard, profileId) {
  placesList.prepend(
    createCard(cardData, removeCard, handleLikeCard, handleShowCard, profileId)
  );
}

function showCards(addCard, removeCard, cards, profileId) {
  cards.forEach((card) => {
    addCard(card, removeCard, profileId);
  });
}

function removeCard(card) {
  changeSavingStatus(popupDeleteCardButton, true);
  const cardId = cardForDelete.getAttribute("data-card_id");
  deleteCard(config, cardId).then(() => {
    card.remove();
    closePopup(popupDeleteCard);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(()=>{
    changeSavingStatus(popupDeleteCardButton, false);
  })
}

function handleOpenPopupProfile(evt) {
  profileInputName.value = profileTitle.textContent;
  profileInputDescription.value = profileDescription.textContent;
  openPopup(profilePopup);
  const formElement = profilePopup.querySelector(".popup__form");
  const inputElements = formElement.querySelectorAll(".popup__input");
  inputElements.forEach((inputElement) => {
    resetValidationErrors(formElement, inputElement, popupValidationConfig);
  });
}
function changeProfile(evt) {
  evt.preventDefault();
  changeSavingStatus(profilePopupButton, true);
  submitProfileChanges(config, {
    name: profileInputName.value,
    about: profileInputDescription.value,
  }).then((profileData) => {
    closePopup(profilePopup);
    updateProfile(profileData);
  })
  .finally(()=>{
    changeSavingStatus(profilePopupButton, false);
  })
}

function saveProfileId(profileData){
  profileId = profileData._id;
}

function updateProfile(profileData) {
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  updateAvatar(profileImage, profileData.avatar);
}

function updateAvatar(avatarElement, newAvatarUrl) {
  avatarElement.style.backgroundImage = `url(${newAvatarUrl})`;
}

function showProfileChanges(config, profileData) {
  getProfile(config).then((profileData) => {
    updateProfile(profileData);
  })
  .catch((err) => {
    console.log(err);
  });;
}

function changeAvatar(config) {
  changeSavingStatus(popupChangeAvatarButton, true);
  submitAvatar(config, {
    avatar: inputNewAvatar.value,
  }).then(() => {
    updateAvatar(profileImage, inputNewAvatar.value);
    closePopup(popupChangeAvatar);
    changeSavingStatus(profilePopupButton, false);
  })
  .finally(()=>{
    changeSavingStatus(profilePopupButton, false);
  })
}

function handleAddPlace() {
  openPopup(popupAddNewCard);
}

function handleOpenPopupDeletePlace(card) {
  cardForDelete = card;
  openPopup(popupDeleteCard);
}

function addPlace(evt, userId, addCardFunc) {
  evt.preventDefault();
  changeSavingStatus(popupAddNewCardButton, true);
  const newPlace = {
    name: inputImgName.value,
    link: inputImgLink.value,
  };
  postCard(config, newPlace).then((cardData) => {
    addCardFunc(cardData, handleOpenPopupDeletePlace, userId);
    closePopup(popupAddNewCard);
    evt.target.reset();
  })
  .finally(()=>{
    changeSavingStatus(popupAddNewCardButton, false);
  })
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

function changeSavingStatus(button, status) {
  if (status) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}


function handleChangeAvatar() {
  openPopup(popupChangeAvatar);
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});


Promise.all([getCards(config), getProfile(config)]).then(
  ([cards, profileData]) => {
    saveProfileId(profileData);
    showCards(addCard, handleOpenPopupDeletePlace, cards, profileId);
    updateProfile(profileData);
  }
  
)
.catch((err) => {
  console.log(err);
});;

profileEditButton.addEventListener("click", handleOpenPopupProfile);

profileForm.addEventListener("submit", changeProfile);

profileImage.addEventListener("click", handleChangeAvatar);

placeAddButton.addEventListener("click", handleAddPlace);

placeForm.addEventListener("submit",(evt)=> {
  
  addPlace(evt, profileId, addCard)});

cardDeleteButton.addEventListener("click", ()=>{
  removeCard(cardForDelete);
});

avatarForm.addEventListener("submit", () => {
  changeAvatar(config);
});

enableValidation(popupValidationConfig);

