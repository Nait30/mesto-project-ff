
function openPopup(popupForOpen) {
  document.addEventListener("keydown", handleEscapeKey);

  popupForOpen.classList.add("popup_is-opened");
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



export {
  openPopup,
  closePopup,
  handleEscapeKey
};
