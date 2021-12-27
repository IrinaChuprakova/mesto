const popupOpenButton = document.querySelector('.profile__edit');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup')


function togglePopup(){
popup.classList.toggle('popup__open')
}

popupOpenButton.addEventListener('click',togglePopup);
popupCloseButton.addEventListener('click',togglePopup);

// Находим форму в DOM
let formElement = document.querySelector('.popup__form')
console.log(formElement)
// Находим поля формы в DOM
let nameInput = document.querySelector('.name')
let jobInput = document.querySelector('.job')

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameValue =  document.querySelector('.name').value;
    jobValue =  document.querySelector('.job').value;
    document.querySelector('.profile__title').textContent = nameValue;
    document.querySelector('.profile__description').textContent = jobValue;
}

formElement.addEventListener('submit', formSubmitHandler);