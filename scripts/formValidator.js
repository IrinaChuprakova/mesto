export class FormValidator {
  constructor(validationSettings, form) {
    this.validationSettings = validationSettings;
    this.form = form;
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

  enableValidation() {
    const button = this.form.querySelector(this.validationSettings.submitButtonSelector);
    const inputs = this.form.querySelectorAll(this.validationSettings.inputSelector);
    const validationSettings = this.validationSettings;
    const setSubmitButtonState = this._setSubmitButtonState;
    inputs.forEach(input => {
      input.addEventListener('input', function () {
        const spanError = input.parentElement.querySelector(`.${validationSettings.errorClass}`);
        if (!input.validity.valid) {
          input.classList.add(validationSettings.inputErrorClass);
          spanError.textContent = input.validationMessage;
        } else {
          input.classList.remove(validationSettings.inputErrorClass);
          spanError.textContent = '';
        }
        const isValid = Array.from(inputs).filter(input => !input.validity.valid).length === 0;
        setSubmitButtonState(isValid, button, validationSettings.inactiveButtonClass);
      })
    });
  };
}