import { Card } from './Card.js';
import { initialCards } from './cards.js';
import { FormValidator } from './FormValidator.js';

const profileEdit = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_type_edit');
const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const profileAdd = document.querySelector('.profile__add');
const popups = document.querySelectorAll('.popup');
const cardsList = document.querySelector('.cards__list');
const cardsTemplate = document.querySelector('#cards__template').content;
// Находим формы редактирования профиля и добавления карточки в DOM
const formEditProfile = document.forms.formEditProfile;
const formAddPlace = document.forms.formAddPlace;
// Находим поля форм редактирования профиля и добавления карточки в DOM
const nameInput = formEditProfile.elements.firstname;
const jobInput = formEditProfile.elements.job;
const place = formAddPlace.elements.place;
const linkPlace = formAddPlace.elements.link;


function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup === null) {
      return;
    }
    closePopup(openedPopup);
  }
}

//открываем popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

//закрываем popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

//на все попапы событие закрытия вне клика формы
popups.forEach(popup => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('button_type_close')) {
      closePopup(popup);
    }
  });
});

// открытие popup редактирования профиля
function openEditPopup() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
  openPopup(popupEdit);
}

// обработчик события на кнопку открытия редактировать профиль
profileEdit.addEventListener('click', openEditPopup);

// Функция сохранения значений инпутов в шапку профиля
function submitEditProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = jobInput.value;
  closePopup(popupEdit);
}

//Обработчик на кнопку сохранить формы редактирования
formEditProfile.addEventListener('submit', submitEditProfile);

profileAdd.addEventListener('click', function () {
  openPopup(popupAddPlace);
});

//Обработчик на кнопку сохранить формы добавленяи карточки
formAddPlace.addEventListener('submit', submitPlace);

const imgOpenPopup = document.querySelector('.popup_type_open-img');
const openedImage = imgOpenPopup.querySelector('.popup__img');
const descriptionPopup = imgOpenPopup.querySelector('.popup__description');

function handleCardClick(name, link) {
  openPopup(imgOpenPopup);
  openedImage.src = link;
  openedImage.alt = name;
  descriptionPopup.innerText = name;
}

function createCard(name, link){
  const data = {name: name, link: link};
  const card = new Card(data, cardsTemplate, handleCardClick);
  return card.create();
}

// создаем карточки из массива начальных данных
initialCards.forEach(function (element) {
  const cardElement = createCard(element.name, element.link);
  cardsList.append(cardElement);
});


// обработчик добавления карточки
function submitPlace(evt) {
  evt.preventDefault();
  const cardElement = createCard(place.value, linkPlace.value);
  cardsList.prepend(cardElement);
  closePopup(popupAddPlace);
  formAddPlace.reset();
}

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_type_error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
}

const forms = document.querySelectorAll(validationSettings.formSelector);

forms.forEach(function (form) {
  const validator = new FormValidator(validationSettings, form);
  validator.enableValidation();
});
