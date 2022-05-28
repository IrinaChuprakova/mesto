import '../pages/index.css'; 
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api.js';
import { PopupWithSubmit} from '../scripts/components/PopupWithSubmit';
import {profileEdit,profileAdd,cardsTemplate,nameInput,jobInput,validationSettings,pictureEdit,profilePicture} from '../scripts/utils/constants.js';

const api = new Api({baseUrl:'https://mesto.nomoreparties.co/v1/cohort-41',
                     headers: {authorization:'051caa04-d7b9-48a1-8ee1-a0f28ba759f9',
                                             'Content-Type': 'application/json'}});

const imgOpenPopup = new PopupWithImage('.popup_type_open-img');
const popupConfirm = new PopupWithSubmit('.popup_type_confirm');
popupConfirm.setEventListeners();

function createCard({name, link, isOwner, id}) {
  const data = {name: name, link: link, isOwner: isOwner};
  const card = new Card(data, cardsTemplate, (name, link) => {
    imgOpenPopup.open(name, link);
  }, () => {
    popupConfirm.setCallback(() => {
      api.removeCard(id)
        .then(() => card.delete())
        .catch(error => console.log(error));
    });
    popupConfirm.open();
  }, (isLiked) => {
    if (isLiked) {
      api.addLike(id)
      .then(() => card.likeCard())
      .catch(error => console.log(error));
      return
    }
    
    api.removeLike(id)
      .then(() => card.likeCard())
      .catch(error => console.log(error));
  });
  return card.create();
}

const section = new Section('.cards__list');

const userInfo = new UserInfo({
  nameSelector:'.profile__title',
  jobSelector:'.profile__description',
  avatar:'.profile__picture'
});

api.getInitialCards()
  .then(cards => cards.forEach(card => {
    const element = createCard({
      name: card.name,
      link: card.link,
      isOwner: userInfo.getUserId() === card.owner._id,
      id: card._id
    });
    section.addItem(element);
  }))
  .catch(error => console.log(error));

api.getUserInfo()
  .then(userData => { 
    userInfo.setUserInfo({name: userData.name, job: userData.about});
    userInfo.setUserAvatar(userData.avatar);
    userInfo.setUserId(userData._id);
  })
  .catch(error => console.log(error));
const validators = {};

document.querySelectorAll(validationSettings.formSelector).forEach(form => {
  const validator = new FormValidator(validationSettings, form);
  validator.enableValidation();
  validators[form.getAttribute('name')] = validator;
});

const popupEdit = new PopupWithForm('.popup_type_edit', values => { 
  api.sendUserInfo(values['firstname'],values['job'])
    .then(userData => {
      userInfo.setUserInfo({name:userData.name, job:userData.about});
      userInfo.setUserAvatar(userData.avatar);
    })
    .catch(error => console.log(error));
});

const popupAddPlace = new PopupWithForm('.popup_type_add-place', values => {
  validators.formAddPlace.resetValidation();
    api.sendCard(values['place'],values['link'])
     .then(cardData =>{
      const cardElement = createCard({name: cardData.name, link: cardData.link});
      section.addItem(cardElement);
     })
     .catch(error => console.log(error));
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

const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', values => {
    api.updateAvatar(values['link'])
    .then(userData => {
      profilePicture.src = userData.avatar;
    })
    .catch(error => console.log(error));
});

popupEditAvatar.setEventListeners();

pictureEdit.addEventListener('click', () => {
  validators.formEditAvatar.resetValidation();
  popupEditAvatar.open();
});
