import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

const popup = document.querySelector(".popup");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const cardPopupImage = document.querySelector(".popup__image");

const addPopupButton = document.querySelector(".profile__add-button");
const editPopupButton = document.querySelector(".profile__edit-button");
const closePopupButton = document.querySelectorAll(".popup__close");

// Добавление попапам класса с анимацией при загрузке страницы

document.addEventListener("DOMContentLoaded", function () {
  popup.classList.add("popup_is-animated");
});

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

// Создание новой карточки

function createCard(initialCards, deleteCard, likeCard, imagePopupOpener, buttonCloseModal) {
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

// Добавление новой карточки на страницу

function addCard(initialCards) {
  const newCard = createCard(
    initialCards,
    deleteCard,
    likeCard,
    imagePopupOpener
  );
  cardsContainer.insertBefore(newCard, cardsContainer.firstChild);

  return newCard;
}

initialCards.forEach((card) => {
  addCard(card, deleteCard);
});

// Закрытие попапа всем подряд

function popupHandleCloser(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', escapeCloseModal);
  document.removeEventListener('click', clickCloseModal);
}

function buttonCloseModal() {
  const popup = document.querySelector('.popup_is-opened')
  popup.classList.remove("popup_is-opened")

  console.log('Test');
}

closePopupButton.forEach((button) => {
  button.addEventListener('click', buttonCloseModal);
});

// function buttonCloseModal(evt) {
//   const popup = document.querySelector('.popup_is-opened');

//   if (evt.target === closePopupButton) {
//     popup.classList.remove("popup_is-opened")
//   }
// }


function clickCloseModal(evt) {
  const popup = document.querySelector('.popup_is-opened')
  if (evt.target !== popup) {
    evt.stopPropagation();
  } else {
    popup.classList.remove("popup_is-opened");
  };
}


function escapeCloseModal(evt) {
  const popup = document.querySelector('.popup_is-opened')
  if (evt.code === "Escape") {
    popup.classList.remove("popup_is-opened");
  }
}

function popupHandleOpener(popup) {
  popupHandleCloser(popup);
  
  popup.classList.add("popup_is-opened");

  document.addEventListener('keydown', escapeCloseModal);
  document.addEventListener('click', clickCloseModal);

  popup.addEventListener("submit", () => {
    popupHandleCloser(popup);
  });
}


addPopupButton.addEventListener("click", () => popupHandleOpener(addPopup));
editPopupButton.addEventListener("click", () => popupHandleOpener(editPopup));
imagePopup.addEventListener("click", () => popupHandleOpener(imagePopup));

// Форма редактирования профиля

const editFormElement = document.querySelector('form[name="edit-profile"]');

const nameInput = editFormElement.querySelector('input[name="name"]');
const jobInput = editFormElement.querySelector('input[name="description"]');

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

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

  console.log(initialCards);
}

addFormElement.addEventListener("submit", handleAddSubmit);

// Открытие попапа с картинкой.

function imagePopupOpener(evt) {
  const card = evt.target.closest(".places__item");
  const cardImage = card.querySelector(".card__image");

  cardPopupImage.src = cardImage.src;
  cardPopupImage.alt = cardImage.alt;

  imagePopup.classList.add("popup_is-opened");
}


