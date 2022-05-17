import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._popupImg = document.querySelector('.popup__img');
        this._popupDescription = document.querySelector('.popup__description')
    }
  open(name,link) {
      this._popupImg.src = link;
      this._popupImg.alt = name;
      this._popupDescription.textContent = name;
      super.open();
  }
}
