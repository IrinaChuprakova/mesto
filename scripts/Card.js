export class Card {
  constructor(data, cardsTemplate, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardsTemplate = cardsTemplate;
    this._handleCardClick = handleCardClick;
    this._cardElement = this._cardsTemplate.querySelector(".cards__item").cloneNode(true);
    this._cardTitle = this._cardElement.querySelector(".cards__title");
    this._cardImage = this._cardElement.querySelector(".cards__img");
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._trashButton = this._cardElement.querySelector(".cards__trash");
    this._likeButton = this._cardElement.querySelector(".cards__like");
  }

  _likeCard(evt) {
    evt.target.classList.toggle("cards__like_active");
  }

  _removeCard(evt) {
    evt.target.closest(".cards__item").remove();
  }

  _setEventListeners() {
    this._trashButton.addEventListener("click", this._removeCard);
    this._likeButton.addEventListener("click", this._likeCard);
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  create() {
    this._setEventListeners();
    return this._cardElement;
  }
}
