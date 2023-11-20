const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = initialCards[i].name;
  cardElement.querySelector(".card__image").src = initialCards[i].link;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener('click', function() {
    deleteButton.closest('.places__item').remove();
  })

  cardsContainer.append(cardElement);
}





