import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

const popup = document.querySelector(".popup");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const addPopupButton = document.querySelector(".profile__add-button");
const editPopupButton = document.querySelector(".profile__edit-button");
const closePopupButton = document.querySelector(".popup__close");

function deleteCard(evt) {
  const card = evt.target.closest(".places__item");
  card.remove();
}

function createCard(initialCards, deleteCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = initialCards.name;
  cardElement.querySelector(".card__image").src = initialCards.link;
  cardElement.querySelector(".card__image").alt = initialCards.name;

  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}

function addCard(initialCards) {
  const newCard = createCard(initialCards, deleteCard);
  cardsContainer.append(newCard);

  return newCard;
}

initialCards.forEach((card) => {
  addCard(card, deleteCard);
});

// Работа попапов

function popupHandleCloser() {
  popup.classList.remove("popup_is-opened");
  console.log('teeest');
}

function popupHandleOpener(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");

  popup.addEventListener("click", (evt) => {
    if (evt.target !== popup) {
      evt.stopPropagation();
    } else {
      popup.classList.remove("popup_is-opened");
    }
  });

  document.addEventListener("keydown", (evt) => {
    if (evt.code === "Escape") {
      popup.classList.remove("popup_is-opened");
    }
  });
}

addPopupButton.addEventListener("click", () => popupHandleOpener(addPopup));
editPopupButton.addEventListener("click", () => popupHandleOpener(editPopup));
closePopupButton.addEventListener("click", popupHandleCloser);

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

  addFormElement.remove()
  
}

addFormElement.addEventListener("submit", handleAddSubmit);
