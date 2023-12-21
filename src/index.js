import "./pages/index.css";

import {
  initialCards,
  createCard,
  deleteCard,
  likeCard,
} from "./components/cards.js";

import {
  clickCloseModal,
  escapeCloseModal,
  popupHandleOpener,
} from "./components/module.js";

const cardsContainer = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const cardPopupImage = document.querySelector(".popup__image");

const addPopupButton = document.querySelector(".profile__add-button");
const editPopupButton = document.querySelector(".profile__edit-button");

// Добавление попапам класса с анимацией при загрузке страницы.
// Изначально добавление класса popup_is-animated было прописано в функции открытия,
// но тогда при первом открытии анимация не срабатывала и я решила
// что логичнее добавлять класс сразу же при загрузке - тогда он работает и при первом открытии

function popupAnimation(popup) {
  popup.classList.add("popup_is-animated");
}

popups.forEach((popup) => {
  popupAnimation(popup);
});

// Добавление новой карточки на страницу

function addCard(initialCards) {
  const newCard = createCard(
    initialCards,
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

addPopupButton.addEventListener("click", () => popupHandleOpener(addPopup));
editPopupButton.addEventListener("click", () => popupHandleOpener(editPopup));

// Форма редактирования профиля

const editFormElement = document.querySelector('form[name="edit-profile"]');

const nameInput = editFormElement.querySelector('input[name="name"]');
const jobInput = editFormElement.querySelector('input[name="description"]');

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const currentName = profileName.textContent;
const currentJob = profileJob.textContent;
nameInput.value = currentName;
jobInput.value = currentJob;

function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;

  profileName.textContent = newName;
  profileJob.textContent = newJob;
}

editFormElement.addEventListener("submit", handleFormSubmit);

// Форма добавления карточки

const addFormElement = document.querySelector('form[name="new-place"]');

const placeName = addFormElement.querySelector('input[name="place-name"]');
const placeLink = addFormElement.querySelector('input[name="link"]');

function handleAddSubmit(evt) {
  evt.preventDefault();

  const newPlaceName = placeName.value;
  const newPlaceLink = placeLink.value;

  let newPlaceData = { name: newPlaceName, link: newPlaceLink };

  initialCards.unshift(newPlaceData);

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

  imagePopup.classList.add("popup_is-opened");

  document.addEventListener("keydown", escapeCloseModal);
  document.addEventListener("click", clickCloseModal);
}
