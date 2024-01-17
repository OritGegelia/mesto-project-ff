/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/components/api.js

var config = {
  Url: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '31536b87-2f99-402f-bf92-fda5063b463d',
    'Content-Type': 'application/json'
  }
};

// Смена аватара 

var changeUserAvatar = function changeUserAvatar(avatarNewLink) {
  return fetch("".concat(config.Url, "/users/me/avatar"), {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarNewLink.value
    })
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430 ".concat(res.status, " \u043F\u0440\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0438 \u0430\u0432\u0430\u0442\u0430\u0440\u0430"));
  });
};

//Cнятие лайка

var removeCardLike = function removeCardLike(cardID) {
  return fetch("".concat(config.Url, "/cards/likes/").concat(cardID), {
    method: 'DELETE',
    headers: config.headers
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430 ".concat(res.status, " \u043F\u0440\u0438 \u0441\u043D\u044F\u0442\u0438\u0438 \u043B\u0430\u0439\u043A\u0430"));
  });
};

//Постановка лайка

var addCardLike = function addCardLike(cardID) {
  return fetch("".concat(config.Url, "/cards/likes/").concat(cardID), {
    method: 'PUT',
    headers: config.headers
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430 ".concat(res.status, " \u043F\u0440\u0438 \u043F\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0435 \u043B\u0430\u0439\u043A\u0430"));
  });
};

// Загрузка карточек с сервера

var initialCards = function initialCards() {
  return fetch("".concat(config.Url, "/cards"), {
    method: 'GET',
    headers: config.headers
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430 ".concat(res.status, " \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A"));
  });
};

// Загрузка актуальных данных пользователя

var currentUserData = function currentUserData() {
  return fetch("".concat(config.Url, "/users/me"), {
    method: 'GET',
    headers: config.headers
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430 ".concat(res.status, " \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435 \u0434\u0430\u043D\u043D\u044B\u0445 \u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435"));
  });
};

// Редактирование данных пользователя

var changeUserProfile = function changeUserProfile(nameInput, jobInput) {
  fetch("".concat(config.Url, "/users/me"), {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430 ".concat(res.status, " \u043F\u0440\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F"));
  }).catch(function (err) {
    console.log(err);
  });
};

// Добавление карточки на страницу

var addNewCard = function addNewCard(placeName, placeLink) {
  return fetch("".concat(config.Url, "/cards"), {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: placeName.value,
      link: placeLink.value
    })
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430 ".concat(res.status, " \u043F\u0440\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0438 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440"));
  });
};

// Удаление карточки

var irrevDeleteCard = function irrevDeleteCard(cardID) {
  return fetch("".concat(config.Url, "/cards/").concat(cardID), {
    method: 'DELETE',
    headers: config.headers
  }).then(function (res) {
    if (res.ok) {
      return 'Успешное удаление';
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u041E\u0448\u0438\u0431\u043A\u0430 ".concat(res.status));
  });
};
;// CONCATENATED MODULE: ./src/components/cards.js


var cardTemplate = document.querySelector("#card-template").content;

// Создание карточки из темплейта

function createCard(card, deleteCard, likeCard, imagePopupOpener, profileId) {
  var cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  var deleteButton = cardElement.querySelector(".card__delete-button");
  var likeButton = cardElement.querySelector(".card__like-button");
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  var countForLikes = cardElement.querySelector(".card__like-container");
  countForLikes.textContent = card.likes.length;
  if (isOwnerCard(card.owner._id, deleteButton, profileId)) {
    deleteButton.addEventListener("click", function (evt) {
      deleteCard(evt, card._id);
    });
  }
  likeButton.addEventListener("click", function (evt) {
    likeCard(evt, card._id, countForLikes);
  });
  cardElement.addEventListener("click", imagePopupOpener);
  return cardElement;
}

// Определение ID владельца

function isOwnerCard(cardOwnerId, button, profileId) {
  if (cardOwnerId !== profileId) {
    button.classList.add('card__delete-button-hide');
  }
  return true;
}

// Удаление карточки

function deleteCard(evt, cardID) {
  irrevDeleteCard(cardID).then(function () {
    return evt.target.closest(".card").remove();
  });
}

// Лайк карточки

function likeCard(evt, cardID, countForLikes) {
  if (evt.target.classList.contains("card__like-button") && !evt.target.classList.contains("card__like-button_is-active")) {
    addCardLike(cardID).then(function (res) {
      countForLikes.textContent = res.likes.length;
      evt.target.classList.add("card__like-button_is-active");
    });
  } else {
    removeCardLike(cardID).then(function (res) {
      countForLikes.textContent = res.likes.length;
      evt.target.classList.remove("card__like-button_is-active");
    });
  }
}
;// CONCATENATED MODULE: ./src/components/module.js

var popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach(function (popup) {
  popup.addEventListener('mouseup', function (event) {
    var targetClassList = event.target.classList;
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close')) {
      popupHandleCloser(popup);
    }
  });
});

// Закрытие по клику на escape

function escapeCloseModal(evt) {
  if (evt.code === "Escape") {
    var popup = document.querySelector('.popup_is-opened');
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
;// CONCATENATED MODULE: ./src/components/validation.js


// Очистить ошибки валидации

var clearValidation = function clearValidation(formElement, clearValidationSettingsObject) {
  var inputList = Array.from(formElement.querySelectorAll(clearValidationSettingsObject.popupInput));
  inputList.forEach(function (inputElement) {
    var formError = formElement.querySelector(".".concat(inputElement.id, "-error"));
    inputElement.classList.remove(clearValidationSettingsObject.inputError);
    formError.textContent = "";
    formError.classList.remove(clearValidationSettingsObject.inputTextError);
  });
};

// Показать ошибку

var showInputError = function showInputError(formElement, inputElement, errorMessage, validationSettingsObject) {
  var formError = formElement.querySelector(".".concat(inputElement.id, "-error"));
  inputElement.classList.add(validationSettingsObject.inputError);
  formError.textContent = errorMessage;
  formError.classList.add(validationSettingsObject.inputTextError);
};

//  Скрыть ошибку

var hideInputError = function hideInputError(formElement, inputElement, validationSettingsObject) {
  var formError = formElement.querySelector(".".concat(inputElement.id, "-error"));
  inputElement.classList.remove(validationSettingsObject.inputError);
  formError.textContent = "";
  formError.classList.remove(validationSettingsObject.inputTextError);
};

// Проверкаа формы на валидность

var formIsValid = function formIsValid(formElement, inputElement, validationSettingsObject) {
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

var containInvalidInput = function containInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
};
var invalidButtonDisabling = function invalidButtonDisabling(inputList, buttonElement) {
  if (containInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

// Навешиватель слушателей на все инпуты.

var setEventListeners = function setEventListeners(formElement, validationSettingsObject) {
  var inputList = Array.from(formElement.querySelectorAll(validationSettingsObject.popupInput));
  var buttonElement = formElement.querySelector(validationSettingsObject.popupButton);
  invalidButtonDisabling(inputList, buttonElement);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      formIsValid(formElement, inputElement, validationSettingsObject);
      invalidButtonDisabling(inputList, buttonElement);
    });
  });
};
;// CONCATENATED MODULE: ./src/index.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var cardsContainer = document.querySelector(".places__list");
var editPopup = document.querySelector(".popup_type_edit");
var editPopupSaveButton = editPopup.querySelector(".popup__button");
var editPopupButton = document.querySelector(".profile__edit-button");
var editFormElement = document.querySelector('form[name="edit-profile"]');
var nameInput = editFormElement.querySelector('input[name="name"]');
var jobInput = editFormElement.querySelector('input[name="description"]');
var profileName = document.querySelector(".profile__title");
var profileJob = document.querySelector(".profile__description");
var addPopup = document.querySelector(".popup_type_new-card");
var addPopupSaveButton = addPopup.querySelector(".popup__button");
var addPopupButton = document.querySelector(".profile__add-button");
var addFormElement = document.querySelector('form[name="new-place"]');
var placeName = addFormElement.querySelector('input[name="place-name"]');
var placeLink = addFormElement.querySelector('input[name="link"]');
var imagePopup = document.querySelector(".popup_type_image");
var cardPopupImage = document.querySelector(".popup__image");
var avatarPopup = document.querySelector(".popup_type_avatar");
var avatarPopupSaveButton = avatarPopup.querySelector(".popup__button");
var avatarEdit = document.querySelector(".profile__image");
var avatarInlineStyles = avatarEdit.style;
var avatarFormElement = document.querySelector('form[name="edit-avatar"]');
var avatarNewLink = avatarFormElement.querySelector('input[name="link"]');
var validationSettingsObject = {
  myForm: ".popup__form",
  popupInput: ".popup__input",
  popupButton: ".popup__button",
  inputError: "popup__input-error",
  inputTextError: "popup__input-error-text-active"
};

// Добавление новой карточки на страницу

function addCard(card, profileId) {
  var newCard = createCard(card, deleteCard, likeCard, imagePopupOpener, profileId);
  cardsContainer.prepend(newCard);
  return newCard;
}
Promise.all([currentUserData(), initialCards()]).then(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    profile = _ref2[0],
    cards = _ref2[1];
  var profileId = profile._id;
  profileName.textContent = profile.name;
  profileJob.textContent = profile.about;
  var newAvatarUrl = profile.avatar;
  avatarInlineStyles.backgroundImage = "url('".concat(newAvatarUrl, "')");
  cards.forEach(function (card) {
    cardsContainer.append(addCard(card, profileId));
  });
});

// Изменение текста кнопки

function changeButtonText(currentButton) {
  switch (currentButton.textContent) {
    case "Сохранение...":
      setTimeout(function () {
        currentButton.textContent = "Сохранить";
      }, 500);
      break;
    default:
      currentButton.textContent = "Сохранение...";
  }
}

// Слушатели открытия модалок редактирования и добавления карточки и редактирования аватара

addPopup.addEventListener("submit", function () {
  return popupHandleCloser(addPopup);
});
addPopupButton.addEventListener("click", function () {
  return popupHandleOpener(addPopup);
});
addPopupSaveButton.addEventListener("click", function () {
  changeButtonText(addPopupSaveButton);
});
editPopup.addEventListener("submit", function () {
  return popupHandleCloser(editPopup);
});
editPopupButton.addEventListener("click", function () {
  popupHandleOpener(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(editPopup, validationSettingsObject);
});
editPopupSaveButton.addEventListener("click", function () {
  changeButtonText(editPopupSaveButton);
});
avatarPopup.addEventListener("submit", function () {
  return popupHandleCloser(avatarPopup);
});
avatarEdit.addEventListener("click", function () {
  return popupHandleOpener(avatarPopup);
});
avatarPopupSaveButton.addEventListener("click", function () {
  changeButtonText(avatarPopupSaveButton);
});

// Форма редактирования аватара

function handleEditAvatar(evt) {
  changeUserAvatar(avatarNewLink);
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
  addNewCard(placeName, placeLink).then(function (card) {
    addCard(card);
    addFormElement.reset();
  }).catch(function (err) {
    console.log(err);
  });
  ;
}
addFormElement.addEventListener("submit", handleAddSubmit, function () {
  clearValidation(addFormElement, validationSettingsObject);
});

// Открытие попапа с картинкой

function imagePopupOpener(evt) {
  if (evt.target.classList.contains("card__delete-button") || evt.target.classList.contains("card__like-button")) {
    return;
  }
  var card = evt.target.closest(".places__item");
  var cardImage = card.querySelector(".card__image");
  cardPopupImage.src = cardImage.src;
  cardPopupImage.alt = cardImage.alt;
  popupHandleOpener(imagePopup);
  document.addEventListener("keydown", escapeCloseModal);
}

// Запускает валидацию всего и вся.

function enableValidation(validationSettingsObject) {
  var formList = Array.from(document.querySelectorAll(validationSettingsObject.myForm));
  formList.forEach(function (formElement) {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationSettingsObject);
  });
}
enableValidation(validationSettingsObject);
/******/ })()
;