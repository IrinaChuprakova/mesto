import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(popupSelector, submit){
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('input');
    }
    _getInputValues() {
      const result = {};
      this._inputList.forEach(element => {
        result[element.getAttribute("name")] = element.value;
      });
      return result;
    }

    setButtonText(){
      this._form.querySelector('.popup__save').textContent = 'Сохранить'  
    }

    setEventListeners() {
      super.setEventListeners();
        this._popup.addEventListener("submit", evt => {
          this._form.querySelector('.popup__save').textContent = 'Сохранить...'
          evt.preventDefault();
          const values = this._getInputValues();
          this._submit(values);
          this.close();
        });
      }

      close() {
        super.close();
        this._form.reset();
      }
}
  
  