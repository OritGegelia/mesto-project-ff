import "./pages/index.css";

import {
  initialCards,
  createCard,
  deleteCard,
  likeCard,
} from "./components/cards.js";

import {
  escapeCloseModal,
  popupHandleOpener,
  popupHandleCloser,
} from "./components/module.js";

const cardsContainer = document.querySelector(".places__list");

const editPopup = document.querySelector(".popup_type_edit");
const editPopupButton = document.querySelector(".profile__edit-button");
const editFormElement = document.querySelector('form[name="edit-profile"]');
const nameInput = editFormElement.querySelector('input[name="name"]');
const jobInput = editFormElement.querySelector('input[name="description"]');
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const addPopup = document.querySelector(".popup_type_new-card");
const addPopupButton = document.querySelector(".profile__add-button");
const addFormElement = document.querySelector('form[name="new-place"]');
const placeName = addFormElement.querySelector('input[name="place-name"]');
const placeLink = addFormElement.querySelector('input[name="link"]');

const imagePopup = document.querySelector(".popup_type_image");
const cardPopupImage = document.querySelector(".popup__image");

// Добавление новой карточки на страницу

function addCard(card) {
  const newCard = createCard(
    card,
    deleteCard,
    likeCard,
    imagePopupOpener
  );

  cardsContainer.insertBefore(newCard, cardsContainer.firstChild); // для реализации добавления новых карточек в начало

  return newCard;
}

// Цикл, перебирающий массив карточек

initialCards.forEach((card) => {
  addCard(card, deleteCard);
});

// Слушатели открытия модалок редактирования и добавления карточки

addPopup.addEventListener("submit", () => popupHandleCloser(addPopup));
addPopupButton.addEventListener("click", () => popupHandleOpener(addPopup));

editPopup.addEventListener("submit", () => popupHandleCloser(editPopup));
editPopupButton.addEventListener("click", () => {
  popupHandleOpener(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// Форма редактирования профиля

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

editFormElement.addEventListener("submit", handleFormSubmit);

// Форма добавления карточки

function handleAddSubmit(evt) {
  evt.preventDefault();

  const newPlaceData = { name: placeName.value, link: placeLink.value };

  addCard(newPlaceData, deleteCard);

  addFormElement.reset();
}

addFormElement.addEventListener("submit", handleAddSubmit);

// Открытие попапа с картинкой.

function imagePopupOpener(evt) {
  if (
    evt.target.classList.contains("card__delete-button") ||
    evt.target.classList.contains("card__like-button")
  ) {
    return;
  }

  const card = evt.target.closest(".places__item");
  const cardImage = card.querySelector(".card__image");

  cardPopupImage.src = cardImage.src;
  cardPopupImage.alt = cardImage.alt;

  popupHandleOpener(imagePopup);

  document.addEventListener("keydown", escapeCloseModal);
}
