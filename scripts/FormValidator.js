export class FormValidator {
  constructor(validationSettings, form) {
    this._validationSettings = validationSettings;
    this._form = form;
    this._button = this._form.querySelector(this._validationSettings.submitButtonSelector); 
    this._inputs = this._form.querySelectorAll(this._validationSettings.inputSelector); 
  }

  _setSubmitButtonState(isFormValid, buttonSave, inactiveButtonClass) {
    if (isFormValid) {
      buttonSave.removeAttribute('disabled');
      buttonSave.classList.remove(inactiveButtonClass);
    } else {
      buttonSave.setAttribute('disabled', true);
      buttonSave.classList.add(inactiveButtonClass);
    }
  };

  _setEventListeners() {
    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        const spanError = input.parentElement.querySelector(`.${this._validationSettings.errorClass}`);
        if (!input.validity.valid) {
          input.classList.add(this._validationSettings.inputErrorClass);
          spanError.textContent = input.validationMessage;
        } else {
          input.classList.remove(this._validationSettings.inputErrorClass);
          spanError.textContent = '';
        }
        const isValid = Array.from(this._inputs).filter(input => !input.validity.valid).length === 0;
        this._setSubmitButtonState(isValid, this._button, this._validationSettings.inactiveButtonClass);
      })
    });
  }

  enableValidation() {
    this._setEventListeners();
  };

  resetValidation(){

  }
}