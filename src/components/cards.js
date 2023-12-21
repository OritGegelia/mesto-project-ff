export {initialCards, createCard, deleteCard, likeCard}

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

const cardTemplate = document.querySelector("#card-template").content;

// Создание карточки из темплейта

function createCard(initialCards, deleteCard, likeCard, imagePopupOpener) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__title").textContent = initialCards.name;
  cardElement.querySelector(".card__image").src = initialCards.link;
  cardElement.querySelector(".card__image").alt = initialCards.name;

  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeCard);
  cardElement.addEventListener("click", imagePopupOpener);

  return cardElement;
}

// Удаление карточки

function deleteCard(evt) {
  const card = evt.target.closest(".places__item");
  card.remove();
}

// Лайк карточки

function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
