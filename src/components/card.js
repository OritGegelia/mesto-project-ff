export { createCard, deleteCard, likeCard };

import { irrevDeleteCard, addCardLike, removeCardLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

// Создание карточки из темплейта

function createCard(card, deleteCard, likeCard, imagePopupOpener, profileId) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  const hasProfileLike = card.likes.some((like) => {
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
    deleteButton.addEventListener("click", (evt) => {
      deleteCard(evt, card._id);
    });
  } else {
    deleteButton.classList.add("card__delete-button-hide");
  }

  likeButton.addEventListener("click", (evt) => {
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
  likeMethod(cardID)
    .then((res) => {
      countForLikes.textContent = res.likes.length;
      evt.target.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => console.log(err));
}
