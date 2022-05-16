import { Card } from './Card.js';
import { initialCards } from './cards.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import '../pages/index.css'; 

const profileEdit = document.querySelector('.profile__edit');
const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');
const profileAdd = document.querySelector('.profile__add');
// const cardsList = document.querySelector('.cards__list');
const cardsTemplate = document.querySelector('#cards__template').content;
// Находим формы редактирования профиля и добавления карточки в DOM
const formEditProfile = document.forms.formEditProfile;
// const formAddPlace = document.forms.formAddPlace;
// Находим поля форм редактирования профиля и добавления карточки в DOM
const nameInput = formEditProfile.elements.firstname;
const jobInput = formEditProfile.elements.job;
//const place = formAddPlace.elements.place;
//const linkPlace = formAddPlace.elements.link;

const imgOpenPopup = new PopupWithImage('.popup_type_open-img');

function createCard({name, link}) {
  const data = {name: name, link: link};
  const card = new Card(data, cardsTemplate, (name, link) => {
    imgOpenPopup.open(name, link);
  });
  return card.create();
}

const section = new Section({items: initialCards, renderer: createCard}, '.cards__list');
section.renderItems();
const userInfo = new UserInfo({nameSelector:'.profile__title', jobSelector:'.profile__description'});

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_type_error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
}

const validators = {};

document.querySelectorAll(validationSettings.formSelector).forEach(form => {
  const validator = new FormValidator(validationSettings, form);
  validator.enableValidation();
  validators[form.getAttribute('name')] = validator;
});

const popupEdit = new PopupWithForm('.popup_type_edit', values => {
  nameProfile.textContent = values['firstname'];
  descriptionProfile.textContent = values['job'];
});

const popupAddPlace = new PopupWithForm('.popup_type_add-place', values => {
  const cardElement = createCard({name: values['place'], link: values['link']});
  section.addItem(cardElement);
  validators.formAddPlace.resetValidation();
});

const popups = [popupEdit, popupAddPlace, imgOpenPopup];

//обработчик события на попапы
popups.forEach(popup => {
  popup.setEventListeners();
});

// обработчик события на кнопку открытия редактировать профиль
profileEdit.addEventListener('click', () => {
  validators.formEditProfile.clearInputsMessage();
  validators.formEditProfile.enableButton();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popupEdit.open();
});

profileAdd.addEventListener('click', () => {
  validators.formAddPlace.resetValidation();
  popupAddPlace.open();
});
