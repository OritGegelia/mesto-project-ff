import "./pages/index.css";

import { createCard, deleteCard, likeCard } from "./components/card.js";

import {
  closePopupByOverlay,
  popupHandleOpener,
  popupHandleCloser,
} from "./components/module.js";

import { clearValidation, enableValidation } from "./components/validation.js";

import {
  changeUserProfile,
  addNewCard,
  currentUserData,
  getInitialCards,
  changeUserAvatar,
} from "./components/api.js";

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
  inputTextError: "popup__input-error-text-active",
};

// Добавление новой карточки на страницу

function addCard(card, profileId) {
  const newCard = createCard(
    card,
    deleteCard,
    likeCard,
    imagePopupOpener,
    profileId
  );

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

  cards.forEach((card) => {
    cardsContainer.append(addCard(card, profileId));
  });
});


const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((popup) => { 
  popup.addEventListener('mouseup', closePopupByOverlay)
});

// Изменение текста кнопки

function changeButtonText(currentButton) {
  switch (currentButton.textContent) {
    case "Сохранение...":
      setTimeout(() => {
        currentButton.textContent = "Сохранить";
      }, 500);
      break;
    default:
      currentButton.textContent = "Сохранение...";
  }
}

// Слушатели открытия модалок редактирования и добавления карточки и редактирования аватара

addPopup.addEventListener("submit", () => popupHandleCloser(addPopup));
addPopupButton.addEventListener("click", () => popupHandleOpener(addPopup));
addPopupSaveButton.addEventListener("click", () => {
  changeButtonText(addPopupSaveButton);
});

editPopup.addEventListener("submit", () => popupHandleCloser(editPopup));
editPopupButton.addEventListener("click", () => {
  popupHandleOpener(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  clearValidation(editPopup, validationSettingsObject);
});
editPopupSaveButton.addEventListener("click", () => {
  changeButtonText(editPopupSaveButton);
});

avatarPopup.addEventListener("submit", () => popupHandleCloser(avatarPopup));
avatarEdit.addEventListener("click", () => popupHandleOpener(avatarPopup));
avatarPopupSaveButton.addEventListener("click", () => {
  changeButtonText(avatarPopupSaveButton);
});

// Форма редактирования аватара

function handleEditAvatar(evt) {
  changeUserAvatar(avatarNewLink.value).then((res) => {
    avatarInlineStyles.backgroundImage = `url('${res.avatar}')`;
  });
  avatarFormElement.reset();
}

avatarFormElement.addEventListener("submit", handleEditAvatar);

// Форма редактирования профиля

function handleEditSubmit(evt) {
  evt.preventDefault();

  changeUserProfile(nameInput, jobInput).then(() => {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  })
}

editFormElement.addEventListener("submit", handleEditSubmit);

// Форма добавления карточки

function handleAddSubmit(evt) {
  evt.preventDefault();

  addNewCard(placeName, placeLink).then((card) => {
    addCard(card, profileId);
    addFormElement.reset();
  }).catch((err) => {
    console.log(err);
  });;
}

addFormElement.addEventListener("submit", handleAddSubmit, () => {
  clearValidation(addFormElement, validationSettingsObject);
});

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
}

enableValidation(validationSettingsObject);
