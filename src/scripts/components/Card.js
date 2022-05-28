export class Card {
  constructor(data, cardsTemplate, handleCardClick, deleteCallback, likeCallback) {
    this._deleteCallback = deleteCallback;
    this._likeCallback = likeCallback;
    this._id = data.id;
    this._name = data.name;
    this._link = data.link;
    this._isOwner = data.isOwner;
    this._isLike = data.likes;
    this._cardsTemplate = cardsTemplate;
    this._handleCardClick = handleCardClick;
    this._cardElement = this._cardsTemplate.querySelector(".cards__item").cloneNode(true);
    this._cardTitle = this._cardElement.querySelector(".cards__title");
    this._cardImage = this._cardElement.querySelector(".cards__img");
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    if (!this._isOwner){
      this._cardElement.querySelector(".cards__trash").remove();
    }
    this._trashButton = this._cardElement.querySelector(".cards__trash");
    this._likeButton = this._cardElement.querySelector(".cards__like");
  }

  likeCard() {
    this._likeButton.classList.toggle("cards__like_active");
  }

  delete() {
    this._trashButton.closest(".cards__item").remove();
  }

  _setEventListeners() {
    if (this._isOwner){
      this._trashButton.addEventListener("click", () => {
        this._deleteCallback();
      });
    }
    
    this._likeButton.addEventListener("click", () => {
      this._likeCallback();
    });
    
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  create() {
    this._setEventListeners();
    return this._cardElement;
  }
}
