export {clickCloseModal, escapeCloseModal, popupHandleOpener}

const closePopupButton = document.querySelectorAll(".popup__close");

// Закрытие по крестику

function buttonCloseModal() {
  const popup = document.querySelector('.popup_is-opened');
  popup.classList.remove("popup_is-opened");
}

// Цикл, навешивающий закрытие на все крестики

closePopupButton.forEach((button) => {
  button.addEventListener('click', buttonCloseModal);
});

// Закрытие по клику на оверлей

function clickCloseModal(evt) {
  const popup = document.querySelector('.popup_is-opened')
  if (evt.target !== popup) {
    evt.stopPropagation();
  } else {
    popup.classList.remove("popup_is-opened");
  };
}

// Закрытие по клику на escape


function escapeCloseModal(evt) {
  const popup = document.querySelector('.popup_is-opened')
  if (evt.code === "Escape") {
    popup.classList.remove("popup_is-opened");
  }
}

// Открытие попапов

function popupHandleOpener(popup) {
  popupHandleCloser(popup);
  
  popup.classList.add("popup_is-opened");

  document.addEventListener('keydown', escapeCloseModal);
  document.addEventListener('click', clickCloseModal);

  popup.addEventListener("submit", () => {
    popupHandleCloser(popup);
  });
}

// Закрытие  со снятием обработчиков

function popupHandleCloser(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', escapeCloseModal);
  document.removeEventListener('click', clickCloseModal);
}