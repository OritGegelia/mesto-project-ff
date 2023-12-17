import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");
const popup = document.querySelector(".popup");
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

function popupEscapeCloser(evt) {
  if (evt.code === "Escape") {
    popup.classList.remove("popup_is-opened");
  }
}

function popupClickCloser(evt) {
  popup.classList.remove("popup_is-opened");
}

function popupHandleCloser() {
  popup.classList.remove("popup_is-opened");
}

function popupHandleOpener() {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", popupEscapeCloser);
  popup.addEventListener('click', popupClickCloser);
}

addPopupButton.addEventListener("click", popupHandleOpener);
editPopupButton.addEventListener("click", popupHandleOpener);
closePopupButton.addEventListener("click", popupHandleCloser);
