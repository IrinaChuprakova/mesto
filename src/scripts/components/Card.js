export class Card {
  constructor(data, cardsTemplate, handleCardClick, deleteCallback, likeCallback) {
    this._deleteCallback = deleteCallback;
    this._likeCallback = likeCallback;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._cardId = data.cardId;
    this._name = data.name;
    this._link = data.link;
    this._isOwner = this._userId === this._ownerId;
    this._likes = data.likes;
    this._cardsTemplate = cardsTemplate;
    this._handleCardClick = handleCardClick;
    this._cardElement = this._cardsTemplate.querySelector(".cards__item").cloneNode(true);
    this._cardTitle = this._cardElement.querySelector(".cards__title");
    this._cardImage = this._cardElement.querySelector(".cards__img");
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCount = this._cardElement.querySelector('.cards__like-count');
    this._likeCount.textContent = this._likes.length;

    if (!this._isOwner){
      this._cardElement.querySelector(".cards__trash").remove();
    }

    this._trashButton = this._cardElement.querySelector(".cards__trash");
    this._likeButton = this._cardElement.querySelector(".cards__like");

    if (this._likes.some((item) => item === this._userId)) {
      this._likeButton.classList.add("cards__like_active");
    }
  }

  likeCard() {
    this._likes.push(this._userId);
    this._likeButton.classList.add("cards__like_active");
    this._likeCount.textContent = this._likes.length;
  }

  unLikeCard() {
    this._likes = this._likes.filter(like => like !== this._userId);
    this._likeButton.classList.remove("cards__like_active");
    this._likeCount.textContent = this._likes.length;
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
      this._likeCallback(this._likes.some((item) => item === this._userId));
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
