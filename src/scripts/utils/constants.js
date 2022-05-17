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

const profileEdit = document.querySelector('.profile__edit');
const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');
const profileAdd = document.querySelector('.profile__add');
const cardsTemplate = document.querySelector('#cards__template').content;
// Находим формы редактирования профиля и добавления карточки в DOM
const formEditProfile = document.forms.formEditProfile;
// Находим поля форм редактирования профиля и добавления карточки в DOM
const nameInput = formEditProfile.elements.firstname;
const jobInput = formEditProfile.elements.job;

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_type_error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
}

export{initialCards,profileEdit,nameProfile,descriptionProfile,profileAdd,cardsTemplate,nameInput,jobInput,validationSettings}