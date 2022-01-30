const profileEdit = document.querySelector(".profile__edit");
const popupEdit = document.querySelector(".popup__edit");
const popupCloseButtons = document.querySelectorAll(".button_type_close");
const popup = document.querySelector(".popup");
const popups = document.querySelectorAll(".popup");
const cardsTemplate = document.querySelector('#cards__template').content;
const cardsList = document.querySelector('.cards__list');
const cardsItem = document.querySelector('.cards__item');
const cardsLike = document.querySelector('.cards__like');
const cardsTrash = document.querySelectorAll('.cards__trash');
const imgOpenPopup =  document.querySelector('.popup__open-img');
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
  popup.classList.toggle("popup_opened");
}

//закрываем popup
function closePopup(evt) {
  evt.target.parentElement.parentElement.classList.remove("popup_opened");
}

// на все кнопки закрытия во всех попапах навешиваем событие закрытия
popupCloseButtons.forEach(elem => elem.addEventListener("click", closePopup));

//на все попапы событие закрытия все клика формы
popups.forEach(popup => {
  popup.addEventListener("click", function(evt) {
    if (evt.target === evt.currentTarget) {
      popup.classList.remove("popup_opened");
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
profileEdit.addEventListener("click", popupOpen);

// Работа попапа редактирования
// Находим форму редактирования профиля в DOM
let formEditProfile = document.querySelector(".popup__form-edit");
// Находим поля формы в DOM
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");
let nameProfile = document.querySelector(".profile__title");
let descriptionProfile = document.querySelector(".profile__description");
// Функция сохранения значений инпутов в шапку профиля
function SubmitEditProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = jobInput.value;
  togglePopup(popupEdit);
}

//Обработчик на кнопку сохранить формы редактирования
formEditProfile.addEventListener("submit", SubmitEditProfile);

// открываем попап добавления карточки 
const popupAddPlace = document.querySelector(".popup__add-place");
const profileAdd = document.querySelector(".profile__add");

profileAdd.addEventListener('click', function () {
  togglePopup(popupAddPlace)
})

// Находим форму добавления карточки в DOM
let formAddPlace = document.querySelector(".popup__form-addPlace");

initialCards.forEach(function (element) {
  const cardElement = cardsTemplate.cloneNode(true);
  const imgElem = cardElement.querySelector('.cards__img');
  const cardTitle = cardElement.querySelector('.cards__title');
  cardTitle.textContent = element.name;
  imgElem.src = element.link;
  cardElement.querySelector('.cards__like').addEventListener('click', likeCard);
  cardElement.querySelector('.cards__trash').addEventListener('click',removeCard)
  cardsList.append(cardElement);
  imgElem.addEventListener('click', function() {
    togglePopup(imgOpenPopup);
    openedImage.src = imgElem.src;
    descriptionPopup.innerText = cardTitle.textContent;
  });
});

function submitPlace (evt){
  evt.preventDefault();
  const cardElement =  cardsTemplate.querySelector('.cards__item').cloneNode(true);
  const place = document.querySelector('.popup__input_type_place');
  const linkPlace = document.querySelector('.popup__input_type_link');
  const trashButton = cardElement.querySelector('.cards__trash');
  trashButton.addEventListener('click', removeCard);
  const likeButton = cardElement.querySelector('.cards__like');
  likeButton.addEventListener('click',likeCard);
  const imgElem = cardElement.querySelector('.cards__img');
  imgElem.src = linkPlace.value;
  const cardTitle = cardElement.querySelector('.cards__title');
  cardTitle.textContent = place.value;
  cardsList.prepend(cardElement);
  togglePopup(popupAddPlace);

  imgElem.addEventListener('click', function() {
    togglePopup(imgOpenPopup);
    openedImage.src = imgElem.src;
    descriptionPopup.innerText = cardTitle.textContent;
  });

}

function createCard(name, link) {
  
}

formAddPlace.addEventListener('submit', submitPlace);
