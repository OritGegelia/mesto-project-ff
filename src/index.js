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

const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarEdit = document.querySelector('.profile__image')
const avatarFormElement = document.querySelector('form[name="edit-avatar"]')

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
  avatarFormElement.reset();
}

avatarFormElement.addEventListener('submit', handleEditAvatar)

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

// Валидация форм

// Показать ошибку

const showInputError = (formElement, inputElement, errorMessage) => {

  const formError = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.add('popup__input-error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__input-error-text-active');
};

// Скрыть ошибку

const hideInputError = (formElement, inputElement) => {

  const formError = formElement.querySelector(`.${inputElement.id}-error`)
  
  inputElement.classList.remove('popup__input-error');
  formError.textContent = '';
  formError.classList.remove('popup__input-error-text-active');
};

// Проверка формы на валидность

const formIsValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// Навешивает слушатели на все инпуты.

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button')

  invalidButtonDisabling(inputList, buttonElement)
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      formIsValid(formElement, inputElement);
      invalidButtonDisabling(inputList, buttonElement);
    });
  });
};

// Блокировка кнопки и отправки формы

const containInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const invalidButtonDisabling = (inputList, buttonElement) => {
  if (containInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

// Запускает валидацию всего и вся.

function enableValidation() {

  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  setEventListeners(formElement);
});
  }

enableValidation()

// API иисусе авось получится

function currentUserData() {
  fetch('https://nomoreparties.co/v1/wff-cohort-4/users/me', {
  headers: {
    authorization: '31536b87-2f99-402f-bf92-fda5063b463d'
  }
}).then(res => res.json())
.then((result) => {
  profileName.textContent = result.name;
  profileJob.textContent = result.about
})} 

currentUserData()

