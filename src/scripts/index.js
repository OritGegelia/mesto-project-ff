const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

function deleteCard(evt) {
  const card = evt.target.closest(".places__item");
  card.remove();
}

function createCard(initialCards, deleteCard) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
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

const popup = document.querySelector('.popup')
