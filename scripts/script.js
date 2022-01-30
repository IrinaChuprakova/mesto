const profileEdit = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_type_edit');
const popupCloseButtons = document.querySelectorAll('.button_type_close');
const popups = document.querySelectorAll('.popup');
const cardsList = document.querySelector('.cards__list');
const imgOpenPopup =  document.querySelector('.popup_type_open-img');
const openedImage = imgOpenPopup.querySelector('.popup__img');
const descriptionPopup = imgOpenPopup.querySelector('.popup__description');

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

//функция лайка 
function likeCard(evt){
  evt.target.classList.toggle('cards__like_active');
}

//функция удаления карточки
function removeCard(evt) {
  evt.target.closest('.cards__item').remove();
}

//открываем popup
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

//закрываем popup
function closePopup(evt) {
  evt.target.parentElement.parentElement.classList.remove('popup_opened');
}

// берем шаблон для карточки
const cardsTemplate = document.querySelector('#cards__template').content;

// функция создания элемента карточки
function createCard(name, link) {
  const cardElement = cardsTemplate.querySelector('.cards__item').cloneNode(true);
  const cardTitle = cardElement.querySelector('.cards__title');
  const cardImage = cardElement.querySelector('.cards__img');
  cardTitle.textContent = name;
  cardImage.src = link;
  const trashButton = cardElement.querySelector('.cards__trash');
  const likeButton = cardElement.querySelector('.cards__like');
  trashButton.addEventListener('click', removeCard);
  likeButton.addEventListener('click',likeCard);
  cardImage.addEventListener('click', function() {
    togglePopup(imgOpenPopup);
    openedImage.src = cardImage.src;
    descriptionPopup.innerText = cardTitle.textContent;
  });
  return cardElement;
}

// создаем карточки из массива начальных данных
initialCards.forEach(function (element) {
  const cardElement = createCard(element.name, element.link);
  cardsList.append(cardElement);
});

// на все кнопки закрытия во всех попапах навешиваем событие закрытия
popupCloseButtons.forEach(elem => elem.addEventListener('click', closePopup));

//на все попапы событие закрытия вне клика формы
popups.forEach(popup => {
  popup.addEventListener('click', function(evt) {
    if (evt.target === evt.currentTarget) {
      popup.classList.remove('popup_opened');
    }
  })
});

// открытие popup редактирования профиля
function popupOpen() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
  togglePopup(popupEdit);
}

// обработчик события на кнопку открытия редактировать профиль
profileEdit.addEventListener('click', popupOpen);

// Работа попапа редактирования
// Находим форму редактирования профиля в DOM
const formEditProfile = document.querySelector('.popup__form-edit');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

// Функция сохранения значений инпутов в шапку профиля
function submitEditProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = jobInput.value;
  togglePopup(popupEdit);
}

//Обработчик на кнопку сохранить формы редактирования
formEditProfile.addEventListener('submit', submitEditProfile);

// открываем попап добавления карточки 
const popupAddPlace = document.querySelector('.popup_type_add-place');
const profileAdd = document.querySelector('.profile__add');

profileAdd.addEventListener('click', function () {
  togglePopup(popupAddPlace)
});


const place = document.querySelector('.popup__input_type_place');
const linkPlace = document.querySelector('.popup__input_type_link');

// обработчик добавления карточки
function submitPlace (evt){
  evt.preventDefault();
  const cardElement = createCard(place.value, linkPlace.value);
  cardsList.prepend(cardElement);
  togglePopup(popupAddPlace);
}

// Находим форму добавления карточки в DOM
const formAddPlace = document.querySelector('.popup__form-addPlace');
formAddPlace.addEventListener('submit', submitPlace);
