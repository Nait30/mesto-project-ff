function openPopup(popup) {
  popup.addEventListener("click", closePopup);

  document.addEventListener("keydown", closePopup);

  popup.classList.add("popup_is-opened");
}

function closePopup(evt) {
  const popupForClose = document.querySelector(".popup_is-opened");
  const popupCloseBtn = popupForClose.querySelector(".popup__close");
  if (
    evt.target === popupForClose ||
    evt.target === popupCloseBtn ||
    evt.key === "Escape"
  ) {
    popupForClose.classList.remove("popup_is-opened");
    popupForClose.removeEventListener("click", closePopup);
    document.removeEventListener("keydown", closePopup);
  }
}

export { openPopup };
