export { createCard, deleteCard, likeCard };

import { irrevDeleteCard, addCardLike, removeCardLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

// Создание карточки из темплейта

function createCard(card, deleteCard, likeCard, imagePopupOpener) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;

  const countForLikes = cardElement.querySelector(".card__like-container");
  
  countForLikes.textContent = card.likes.length;

  deleteButton.addEventListener("click", (evt) => {
    deleteCard(evt, card._id);
  });

  likeButton.addEventListener("click", (evt) => {
    likeCard(evt, card._id, countForLikes)
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
  if ((evt.target.classList.contains("card__like-button")) && !(evt.target.classList.contains("card__like-button_is-active"))
  ) {
    addCardLike(cardID).then((res) => {
      countForLikes.textContent = res.likes.length
      evt.target.classList.add("card__like-button_is-active")
    });
    } else {
    removeCardLike(cardID).then((res) => {
      countForLikes.textContent = res.likes.length
      evt.target.classList.remove("card__like-button_is-active")
    }); 
  }
}
