const popupOpenButton = document.querySelector(".profile__edit");
const popupCloseButton = document.querySelector(".button_type_close");
const popup = document.querySelector(".popup");
//массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function togglePopup() {
  popup.classList.toggle("popup_opened");
}

function popupOpen() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
  togglePopup();
}

function closePopupOnOverlayClick(event) {
  if (event.target === event.currentTarget) {
    popup.classList.remove("popup_opened");
  }
}


const like = document.querySelector('.cards__like');
like.addEventListener('click', function (evt) {
  evt.target.classList.toggle('cards__like_active');
});



popupOpenButton.addEventListener("click", popupOpen);
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
  togglePopup();
}

formElement.addEventListener("submit", formSubmitHandler);

function addCards(cardsTitleValue,cardsImgValue){
const cardsTemplate = document.querySelector('#cards__template').content;
const cardsElement = cardsTemplate.querySelector('.cards__item').cloneNode(true);

cardsElement.querySelector('.cards__title').textContent = cardsTitleValue;
cardsElement.querySelector('.cards__img').textContent = cardsImgValue;
}
