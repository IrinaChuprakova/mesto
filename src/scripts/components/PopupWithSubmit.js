import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
    }

    setCallback(callback) {
        this._callback = callback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callback();
        })
    }
}