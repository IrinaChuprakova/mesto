const profileEdit = document.querySelector(".profile__edit");
const popupEdit = document.querySelector(".popup__edit");
const popupCloseButtons = document.querySelectorAll(".button_type_close");
const popup = document.querySelector(".popup");
const cardsTemplate = document.querySelector('#cards__template').content;
const cardsList = document.querySelector('.cards__list');
const cardsTrash = document.querySelector('.cards__trash');

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

// добавляем карточки из массива
initialCards.forEach(function (element) {
  const cardElement = cardsTemplate.cloneNode(true);
  cardElement.querySelector('.cards__title').textContent = element.name;
  cardElement.querySelector('.cards__img').src = element.link;

  cardElement.querySelector('.cards__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__like_active');
  });
  cardsList.append(cardElement);
})

//открываем popup
function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

//закрываем popup
function closePopup(evt) {
  evt.target.parentElement.parentElement.classList.remove("popup_opened");
}

//закрываем popup по клику вне формы
function closePopupOnOverlayClick(event) {
  if (event.target === event.currentTarget) {
    popup.classList.remove("popup_opened");
  }
}

// открытие popup редактирования профиля
function popupOpen() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
  togglePopup(popupEdit);
}


// обработчики собsтия на открытие/закрытие попапа редактирования профиля и попапа добавляения карточки
profileEdit.addEventListener("click", popupOpen);


// на все кнопки закрытия во всех попапах навешиваем событие 
popupCloseButtons.forEach(elem => elem.addEventListener("click", closePopup));

popup.addEventListener("click", closePopupOnOverlayClick);

// Работа попапа редактирования
// Находим форму в DOM
let formElement = document.querySelector(".popup__form");
// Находим поля формы в DOM
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");
let nameProfile = document.querySelector(".profile__title");
let descriptionProfile = document.querySelector(".profile__description");
// Функция сохранения значений инпутов в шапку профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = jobInput.value;
  togglePopup(popupEdit);
}

formElement.addEventListener("submit", formSubmitHandler);

// открываем попап добавления карточки 
const popupAddPlace = document.querySelector(".popup__add-place");
const profileAdd = document.querySelector(".profile__add");

profileAdd.addEventListener('click', function () {
  togglePopup(popupAddPlace)
})

// карточку добавляем
// function addCards(cardsTitleValue,cardsImgValue){

// const cardsElement = cardsTemplate.querySelector('.cards__item').cloneNode(true);

// cardsElement.querySelector('.cards__title').textContent = cardsTitleValue;
// cardsElement.querySelector('.cards__img').textContent = cardsImgValue;
// }

// удаляем карточку
// cardsTrash.addEventListener("click",cardsDel);

// function cardsDel(evt){
//   evt.target.closest('.cards__item').remove();

// }

