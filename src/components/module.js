export { popupHandleOpener, popupHandleCloser, closePopupByOverlay };

const closePopupByOverlay = (evt) => {
  const targetClassList = evt.target.classList;
  if (
    targetClassList.contains("popup") ||
    targetClassList.contains("popup__close")
  ) {
    popupHandleCloser(evt.currentTarget);
  }
};

// Закрытие по клику на escape

function escapeCloseModal(evt) {
  if (evt.code === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    popupHandleCloser(popup);
  }
}

// Открытие попапов

function popupHandleOpener(popup) {
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", escapeCloseModal);
}

// Закрытие  со снятием обработчиков

function popupHandleCloser(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escapeCloseModal);
}
