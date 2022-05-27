import '../pages/index.css'; 
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api.js';
import {initialCards,profileEdit,nameProfile,descriptionProfile,profileAdd,cardsTemplate,nameInput,jobInput,validationSettings} from '../scripts/utils/constants.js'

const api = new Api({baseUrl:'https://mesto.nomoreparties.co/v1/cohort-41',
                     headers: {authorization:'051caa04-d7b9-48a1-8ee1-a0f28ba759f9',
                                             'Content-Type': 'application/json'}});

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

const validators = {};

document.querySelectorAll(validationSettings.formSelector).forEach(form => {
  const validator = new FormValidator(validationSettings, form);
  validator.enableValidation();
  validators[form.getAttribute('name')] = validator;
});

const popupEdit = new PopupWithForm('.popup_type_edit', values => {
  const userData = userInfo.setUserInfo({name: values['firstname'],job:values['job']});
});

const popupAddPlace = new PopupWithForm('.popup_type_add-place', values => {
  const cardElement = createCard({name: values['place'], link: values['link']});
  section.addItem(cardElement);
  validators.formAddPlace.resetValidation();
});

const popups = [popupEdit, popupAddPlace, imgOpenPopup];

popups.forEach(popup => {
  popup.setEventListeners();
});

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
