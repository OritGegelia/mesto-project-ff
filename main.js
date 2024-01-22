/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/components/api.js

const config = {
  Url: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "31536b87-2f99-402f-bf92-fda5063b463d",
    "Content-Type": "application/json"
  }
};

// Смена аватара

const changeUserAvatar = avatar => {
  return fetch(`${config.Url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  }).then(handleResponse);
};

//Cнятие лайка

const removeCardLike = cardID => {
  return fetch(`${config.Url}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers
  }).then(handleResponse);
};

//Постановка лайка

const addCardLike = cardID => {
  return fetch(`${config.Url}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers
  }).then(handleResponse);
};

// Загрузка карточек с сервера

const getInitialCards = () => {
  return fetch(`${config.Url}/cards`, {
    method: "GET",
    headers: config.headers
  }).then(handleResponse);
};

// Загрузка актуальных данных пользователя

const currentUserData = () => {
  return fetch(`${config.Url}/users/me`, {
    method: "GET",
    headers: config.headers
  }).then(handleResponse);
};

// Редактирование данных пользователя

const changeUserProfile = (name, job) => {
  return fetch(`${config.Url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job
    })
  }).then(handleResponse);
};

// Добавление карточки на страницу

const addNewCard = (name, link) => {
  return fetch(`${config.Url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  }).then(handleResponse);
};

// Удаление карточки

const irrevDeleteCard = cardID => {
  return fetch(`${config.Url}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers
  }).then(handleResponse);
};

// Обработчик ошибок

const handleResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};
;// CONCATENATED MODULE: ./src/components/card.js


const cardTemplate = document.querySelector("#card-template").content;

// Создание карточки из темплейта

function createCard(card, deleteCard, likeCard, imagePopupOpener, profileId) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const hasProfileLike = card.likes.some(like => {
    return like._id === profileId;
  });
  if (hasProfileLike) {
    likeButton.classList.add("card__like-button_is-active");
  }
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  const countForLikes = cardElement.querySelector(".card__like-container");
  countForLikes.textContent = card.likes.length;
  if (card.owner._id === profileId) {
    deleteButton.addEventListener("click", evt => {
      deleteCard(evt, card._id);
    });
  } else {
    deleteButton.classList.add("card__delete-button-hide");
  }
  likeButton.addEventListener("click", evt => {
    likeCard(evt, card._id, countForLikes);
  });
  cardElement.addEventListener("click", imagePopupOpener);
  return cardElement;
}

// Удаление карточки

function deleteCard(evt, cardID) {
  irrevDeleteCard(cardID).then(() => evt.target.closest(".card").remove());
}

// Лайк карточки

function likeCard(evt, cardID, countForLikes) {
  const isLiked = evt.target.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? removeCardLike : addCardLike;
  likeMethod(cardID).then(res => {
    countForLikes.textContent = res.likes.length;
    evt.target.classList.toggle("card__like-button_is-active");
  }).catch(err => console.log(err));
}
;// CONCATENATED MODULE: ./src/components/module.js

const closePopupByOverlay = evt => {
  const targetClassList = evt.target.classList;
  if (targetClassList.contains("popup") || targetClassList.contains("popup__close")) {
    popupHandleCloser(evt.currentTarget);
  }
};

// Закрытие по клику на escape

function escapeCloseModal(evt) {
  if (evt.code === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    popupHandleCloser(popup);
  }
}

// Открытие попапов

function popupHandleOpener(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escapeCloseModal);
}

// Закрытие  со снятием обработчиков

function popupHandleCloser(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escapeCloseModal);
}
;// CONCATENATED MODULE: ./src/components/validation.js


// Запускает валидацию всего и вся.

function enableValidation(validationSettingsObject) {
  const formList = Array.from(document.querySelectorAll(validationSettingsObject.myForm));
  formList.forEach(formElement => {
    formElement.addEventListener("submit", evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationSettingsObject);
  });
}

// Очистить ошибки валидации

const clearValidation = (formElement, validationSettingsObject) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettingsObject.popupInput));
  const buttonElement = formElement.querySelector(validationSettingsObject.popupButton);
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, validationSettingsObject);
  });
  toggleButtonState(inputList, buttonElement);
};

// Показать ошибку

const showInputError = (formElement, inputElement, errorMessage, validationSettingsObject) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSettingsObject.inputError);
  formError.textContent = errorMessage;
  formError.classList.add(validationSettingsObject.inputTextError);
};

//  Скрыть ошибку

const hideInputError = (formElement, inputElement, validationSettingsObject) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSettingsObject.inputError);
  formError.textContent = "";
  formError.classList.remove(validationSettingsObject.inputTextError);
};

// Проверка формы на валидность

const formIsValid = (formElement, inputElement, validationSettingsObject) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSettingsObject);
  } else {
    hideInputError(formElement, inputElement, validationSettingsObject);
  }
};

// Блокировка кнопки при невалидных данных

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement) => {
  buttonElement.disabled = hasInvalidInput(inputList);
};

// Навешиватель слушателей на все инпуты.

const setEventListeners = (formElement, validationSettingsObject) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettingsObject.popupInput));
  const buttonElement = formElement.querySelector(validationSettingsObject.popupButton);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach(inputElement => {
    inputElement.addEventListener("input", function () {
      formIsValid(formElement, inputElement, validationSettingsObject);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
;// CONCATENATED MODULE: ./src/index.js





const cardsContainer = document.querySelector(".places__list");
const editPopup = document.querySelector(".popup_type_edit");
const editPopupSaveButton = editPopup.querySelector(".popup__button");
const editPopupButton = document.querySelector(".profile__edit-button");
const editFormElement = document.querySelector('form[name="edit-profile"]');
const nameInput = editFormElement.querySelector('input[name="name"]');
const jobInput = editFormElement.querySelector('input[name="description"]');
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const addPopup = document.querySelector(".popup_type_new-card");
const addPopupSaveButton = addPopup.querySelector(".popup__button");
const addPopupButton = document.querySelector(".profile__add-button");
const addFormElement = document.querySelector('form[name="new-place"]');
const placeName = addFormElement.querySelector('input[name="place-name"]');
const placeLink = addFormElement.querySelector('input[name="link"]');
const imagePopup = document.querySelector(".popup_type_image");
const cardPopupImage = document.querySelector(".popup__image");
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarPopupSaveButton = avatarPopup.querySelector(".popup__button");
const avatarEdit = document.querySelector(".profile__image");
const avatarInlineStyles = avatarEdit.style;
const avatarFormElement = document.querySelector('form[name="edit-avatar"]');
const avatarNewLink = avatarFormElement.querySelector('input[name="link"]');
const validationSettingsObject = {
  myForm: ".popup__form",
  popupInput: ".popup__input",
  popupButton: ".popup__button",
  inputError: "popup__input-error",
  inputTextError: "popup__input-error-text-active"
};

// Добавление новой карточки на страницу

function addCard(card, profileId) {
  const newCard = createCard(card, deleteCard, likeCard, imagePopupOpener, profileId);
  cardsContainer.prepend(newCard);
  return newCard;
}
let profileId;
Promise.all([currentUserData(), getInitialCards()]).then(([profile, cards]) => {
  profileId = profile._id;
  const newAvatarUrl = profile.avatar;
  profileName.textContent = profile.name;
  profileJob.textContent = profile.about;
  avatarInlineStyles.backgroundImage = `url('${newAvatarUrl}')`;
  cards.reverse().forEach(card => {
    addCard(card, profileId);
  });
}).catch(err => {
  console.log(err);
});
const popupList = Array.from(document.querySelectorAll(".popup"));
popupList.forEach(popup => {
  popup.addEventListener("mouseup", closePopupByOverlay);
});

// Слушатели открытия модалок редактирования и добавления карточки и редактирования аватара

addPopup.addEventListener("submit", () => popupHandleCloser(addPopup));
addPopupButton.addEventListener("click", () => popupHandleOpener(addPopup));
editPopup.addEventListener("submit", () => popupHandleCloser(editPopup));
editPopupButton.addEventListener("click", () => {
  popupHandleOpener(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(editPopup, validationSettingsObject);
});
avatarPopup.addEventListener("submit", () => popupHandleCloser(avatarPopup));
avatarEdit.addEventListener("click", () => popupHandleOpener(avatarPopup));

// Форма редактирования аватара

function handleEditAvatar(evt) {
  evt.preventDefault();
  avatarPopupSaveButton.textContent = "Сохранение...";
  changeUserAvatar(avatarNewLink.value).then(res => {
    avatarInlineStyles.backgroundImage = `url('${res.avatar}')`;
  }).finally(() => {
    avatarPopupSaveButton.textContent = "Cохранить";
  }).catch(err => {
    console.log(err);
  });
  avatarFormElement.reset();
}
avatarFormElement.addEventListener("submit", handleEditAvatar);

// Форма редактирования профиля

function handleEditProfile(evt) {
  evt.preventDefault();
  editPopupSaveButton.textContent = "Сохранение...";
  changeUserProfile(nameInput.value, jobInput.value).then(() => {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  }).finally(() => {
    avatarPopupSaveButton.textContent = "Cохранить";
  }).catch(err => {
    console.log(err);
  });
}
editFormElement.addEventListener("submit", handleEditProfile);
editPopupSaveButton.addEventListener("click", () => {});

// Форма добавления карточки

function handleAddSubmit(evt) {
  evt.preventDefault();
  addPopupSaveButton.textContent = "Сохранение...";
  addNewCard(placeName.value, placeLink.value).then(card => {
    addCard(card, profileId);
    addFormElement.reset();
  }).finally(() => {
    avatarPopupSaveButton.textContent = "Cохранить";
  }).catch(err => {
    console.log(err);
  });
}
addFormElement.addEventListener("submit", handleAddSubmit, () => {
  clearValidation(addFormElement, validationSettingsObject);
});

// Открытие попапа с картинкой

function imagePopupOpener(evt) {
  if (evt.target.classList.contains("card__delete-button") || evt.target.classList.contains("card__like-button")) {
    return;
  }
  const card = evt.target.closest(".places__item");
  const cardImage = card.querySelector(".card__image");
  cardPopupImage.src = cardImage.src;
  cardPopupImage.alt = cardImage.alt;
  popupHandleOpener(imagePopup);
}
enableValidation(validationSettingsObject);
/******/ })()
;