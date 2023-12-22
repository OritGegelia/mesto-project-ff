export { escapeCloseModal, popupHandleOpener, popupHandleCloser}

const popupList = Array.from(document.querySelectorAll('.popup'));

popupList.forEach((popup) => {
  popup.addEventListener('mouseup', (event) => {
    const targetClassList = event.target.classList; 
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close')) {
      popupHandleCloser(popup); 
    }
  })
}) 

// Закрытие по клику на escape


function escapeCloseModal(evt) {
  if (evt.code === "Escape") {
    const popup = document.querySelector('.popup_is-opened')
    popup.classList.remove("popup_is-opened");
  }
}

// Открытие попапов

function popupHandleOpener(popup) {
  
  popup.classList.add("popup_is-opened");

  document.addEventListener('keydown', escapeCloseModal);
}

// Закрытие  со снятием обработчиков

function popupHandleCloser(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', escapeCloseModal);
}