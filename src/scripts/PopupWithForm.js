import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(popupSelector, submit){
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
    }
    _getInputValues() {
      const result = {};
      this._form.querySelectorAll('input').forEach(element => {
        result[element.getAttribute("name")] = element.value;
      });
      return result;
    }

    setEventListeners() {
        this._popup.addEventListener("click", evt => {
          if (evt.target.classList.contains("popup") || evt.target.classList.contains("button_type_close")) {
              this.close();
          }
        });
        this._popup.addEventListener("submit", evt => {
          evt.preventDefault();
          const values = this._getInputValues();
          this._submit(values);
          this.close();
        });
      }

      close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
        this._form.reset();
      }
}
  
  