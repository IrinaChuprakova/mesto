const profileEdit = document.querySelector('.profile__edit');
const profileAdd = document.querySelector('.profile__add');
const pictureEdit = document.querySelector('.profile__edit-picture');
const profilePicture = document.querySelector('.profile__picture');
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

    const cardTrash = document.querySelectorAll('.cards__trash');
    // const popupConfirm = document.querySelector('.popup_type_confirm');
    
export{profileEdit,profileAdd,cardsTemplate,nameInput,jobInput,validationSettings,pictureEdit,profilePicture}