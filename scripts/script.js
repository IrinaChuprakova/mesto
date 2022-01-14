const popupOpenButton = document.querySelector(".profile__edit");
const popupCloseButton = document.querySelector(".button_type_close");
const popup = document.querySelector(".popup");

function togglePopup() {
  popup.classList.toggle("popup_type_open");
  nameInput.value = nameProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
}
function closePopupOnOverlayClick(event) {
  if (event.target === event.currentTarget) {
    popup.classList.remove("popup_type_open");
  }
}

popupOpenButton.addEventListener("click", togglePopup);
popupCloseButton.addEventListener("click", togglePopup);
popup.addEventListener("click", closePopupOnOverlayClick);

// Находим форму в DOM
let formElement = document.querySelector(".popup__form");
// Находим поля формы в DOM
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");
let nameProfile = document.querySelector(".profile__title");
let descriptionProfile = document.querySelector(".profile__description");


function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = jobInput.value;
}

formElement.addEventListener("submit", formSubmitHandler);
