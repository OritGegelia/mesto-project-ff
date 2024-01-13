import "./pages/index.css";

import { createCard, deleteCard, likeCard } from "./components/cards.js";

import {
  escapeCloseModal,
  popupHandleOpener,
  popupHandleCloser,
} from "./components/module.js";

import { setEventListeners } from "./components/validation.js";

import { changeUserProfile, addNewCard, currentUserData, initialCards } from "./components/api.js";

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

const profileUserAvatar = document.querySelector('.profile__image')
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarEdit = document.querySelector(".profile__image");
const avatarFormElement = document.querySelector('form[name="edit-avatar"]');

document.addEventListener('DOMContentLoaded', function () {
  currentUserData(profileName, profileJob);
})

// Добавление новой карточки на страницу

function addCard(card) {
  const newCard = createCard(card, deleteCard, likeCard, imagePopupOpener);

  cardsContainer.append(newCard);

  return newCard;
}

// Цикл, перебирающий массив карточек

initialCards().then((data) => {
  data.forEach((card) => {
    addCard(card, deleteCard);
  });
});

// Слушатели открытия модалок редактирования и добавления карточки и редактирования аватара

addPopup.addEventListener("submit", () => popupHandleCloser(addPopup));
addPopupButton.addEventListener("click", () => popupHandleOpener(addPopup));

editPopup.addEventListener("submit", () => popupHandleCloser(editPopup));
editPopupButton.addEventListener("click", () => {
  popupHandleOpener(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});


avatarPopup.addEventListener("submit", () => popupHandleCloser(avatarPopup));
avatarEdit.addEventListener("click", () => popupHandleOpener(avatarPopup));

// Форма редактирования аватара

function handleEditAvatar(evt) {
  evt.preventDefault();
  changeUserProfile(profileUserAvatar)
  avatarFormElement.reset();
}

avatarFormElement.addEventListener("submit", handleEditAvatar);

// Форма редактирования профиля

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  changeUserProfile(nameInput, jobInput);
}

editFormElement.addEventListener("submit", handleFormSubmit);

// Форма добавления карточки

function handleAddSubmit(evt) {
  evt.preventDefault();

  addNewCard(placeName, placeLink)
    .then((card) => {
      addCard(card);
      addFormElement.reset();
  });
}

addFormElement.addEventListener("submit", handleAddSubmit);

// Открытие попапа с картинкой

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

// Запускает валидацию всего и вся.

function enableValidation(validationSettingsObject) {
  const formList = Array.from(
    document.querySelectorAll(validationSettingsObject.myForm)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationSettingsObject);
  });
}

enableValidation({
  myForm: ".popup__form",
  popupInput: ".popup__input",
  popupButton: ".popup__button",
  inputError: "popup__input-error",
  inputTextError: "popup__input-error-text-active",
});

