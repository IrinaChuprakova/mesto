const popupOpenButton = document.querySelector(".profile__edit");
const popupCloseButton = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");

function togglePopup() {
  popup.classList.toggle("popup-open");
}
function closePopupOnOverlayClick(event) {
  if (event.target === event.currentTarget) {
    popup.classList.remove("popup-open");
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
nameInput.value = nameProfile.textContent; 
jobInput.value = descriptionProfile.textContent; 


function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = jobInput.value;
}

formElement.addEventListener("submit", formSubmitHandler);
