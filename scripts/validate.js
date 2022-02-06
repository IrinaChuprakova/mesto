function setSubmitButtonState(isFormValid, buttonSave, inactiveButtonClass) {
  if (isFormValid) {
    buttonSave.removeAttribute('disabled');
    buttonSave.classList.remove(inactiveButtonClass);
  } else {
    buttonSave.setAttribute('disabled', true);
    buttonSave.classList.add(inactiveButtonClass);
  }
};

function enableValidation(validationSettings) {
  const form = document.forms[validationSettings.formSelector];
  const button = form.querySelector(validationSettings.submitButtonSelector);
  const inputs = form.querySelectorAll(validationSettings.inputSelector);

  inputs.forEach(input => {
    input.addEventListener('input', function () {
      const spanError = input.parentElement.querySelector(validationSettings.errorClass);
      if (!input.validity.valid) {
        spanError.textContent = input.validationMessage;
      } else {
        spanError.textContent = '';
      }
      setSubmitButtonState(input.validity.valid, button, validationSettings.inactiveButtonClass);
    })
  });
};

