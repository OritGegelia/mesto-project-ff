initialCards.forEach((card) => {
  addCard(card, deleteCard);
})

function deleteCard(evt) {
  const card = evt.target.closest('.places__item');
  card.remove()
}

function addCard(initialCards, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardsContainer = document.querySelector(".places__list");
  let cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button')

  cardsContainer.append(cardElement);

  cardElement.querySelector(".card__title").textContent = initialCards.name;
  cardElement.querySelector(".card__image").src = initialCards.link;

  deleteButton.addEventListener('click', deleteCard)
}







