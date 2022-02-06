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

  form.addEventListener('input', function () {
    const isValid = Array.from(inputs).filter(input => !input.validity.valid).length === 0;
    setSubmitButtonState(isValid, button, validationSettings.inactiveButtonClass);
  });

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
    })
  });
};

