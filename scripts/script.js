const profileEdit = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_type_edit');
const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const profileAdd = document.querySelector('.profile__add');
const popupCloseButtons = document.querySelectorAll('.button_type_close');
const popups = document.querySelectorAll('.popup');
const cardsList = document.querySelector('.cards__list');
const imgOpenPopup =  document.querySelector('.popup_type_open-img');
const openedImage = imgOpenPopup.querySelector('.popup__img');
const descriptionPopup = imgOpenPopup.querySelector('.popup__description');
const cardsTemplate = document.querySelector('#cards__template').content;
// Находим формы редактирования профиля и добавления карточки в DOM
const formEditProfile = document.querySelector('.popup__form-edit');
const formAddPlace = document.querySelector('.popup__form-addPlace');
// Находим поля форм редактирования профиля и добавления карточки в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const place = document.querySelector('.popup__input_type_place');
const linkPlace = document.querySelector('.popup__input_type_link');

//функция лайка 
function likeCard(evt){
  evt.target.classList.toggle('cards__like_active');
}

//функция удаления карточки
function removeCard(evt) {
  evt.target.closest('.cards__item').remove();
}

//открываем popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// функция создания элемента карточки
function createCard(name, link) {
  const cardElement = cardsTemplate.querySelector('.cards__item').cloneNode(true);
  const cardTitle = cardElement.querySelector('.cards__title');
  const cardImage = cardElement.querySelector('.cards__img');
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  const trashButton = cardElement.querySelector('.cards__trash');
  const likeButton = cardElement.querySelector('.cards__like');
  trashButton.addEventListener('click', removeCard);
  likeButton.addEventListener('click',likeCard);
  cardImage.addEventListener('click', function() {
    openPopup(imgOpenPopup);
    openedImage.src = cardImage.src;
    openedImage.alt = cardImage.alt;
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
popupCloseButtons.forEach(elem => elem.addEventListener('click', function(evt) {
  closePopup(evt.target.parentElement.parentElement);
}));

//на все попапы событие закрытия вне клика формы
popups.forEach(popup => {
  popup.addEventListener('click', function(evt) {
    if (evt.target === evt.currentTarget) {
      popup.classList.remove('popup_opened');
    }
  })
});

// обработчик события на кнопку открытия редактировать профиль
profileEdit.addEventListener('click', popupOpen);

// открытие popup редактирования профиля
function popupOpen() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
  openPopup(popupEdit);
}

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
  openPopup(popupAddPlace)
});

// обработчик добавления карточки
function submitPlace (evt){
  evt.preventDefault();
  const cardElement = createCard(place.value, linkPlace.value);
  cardsList.prepend(cardElement);
  closePopup(popupAddPlace);
}

//Обработчик на кнопку сохранить формы добавленяи карточки
formAddPlace.addEventListener('submit', submitPlace);
