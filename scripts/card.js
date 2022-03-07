export class Card{
    constructor (name, link, cardsTemplate){
      this.name = name;
      this.link = link;
      this.cardsTemplate = cardsTemplate;
    }
  
    _likeCard(evt) {
      evt.target.classList.toggle('cards__like_active');
    }
  
    _removeCard(evt) {
      evt.target.closest('.cards__item').remove();
    }
  
    create(openPopupCallback) {
      const cardElement = this.cardsTemplate.querySelector('.cards__item').cloneNode(true);
      const cardTitle = cardElement.querySelector('.cards__title');
      const cardImage = cardElement.querySelector('.cards__img');
      cardTitle.textContent = this.name;
      cardImage.src = this.link;
      cardImage.alt = this.name;
      const trashButton = cardElement.querySelector('.cards__trash');
      const likeButton = cardElement.querySelector('.cards__like');
      trashButton.addEventListener('click', this._removeCard);
      likeButton.addEventListener('click', this._likeCard);
      const imgOpenPopup = document.querySelector('.popup_type_open-img');
      const openedImage = imgOpenPopup.querySelector('.popup__img');
      const descriptionPopup = imgOpenPopup.querySelector('.popup__description');
      cardImage.addEventListener('click', function () {
        openPopupCallback(imgOpenPopup);
        openedImage.src = cardImage.src;
        openedImage.alt = cardImage.alt;
        descriptionPopup.innerText = cardTitle.textContent;
      });
      return cardElement;
    }
  }
  