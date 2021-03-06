import {Card, initialCards} from "../scripts/Card.js";
import {FormValidator} from "../scripts/FormValidator.js";


// Объявил переменные редактирующей модалки
const modalEdit = document.querySelector('.modal_edit-profile');
const openModalButton = document.querySelector('.profile-info__edit-button');
const closeModalButton = document.querySelector('.modal__close-button');
const editForm = modalEdit.querySelector('.form');
const editButton = modalEdit.querySelector('.form__save-button');

// Объявил переменные добавляющей модалки
const modalAdd = document.querySelector('.modal_add-card');
const openModalAddButton = document.querySelector('.profile__add-button');
const closeModalAddButton = modalAdd.querySelector('.modal__close-button');
const addForm = modalAdd.querySelector('.form');
const addButton = modalAdd.querySelector('.form__save-button');

const name = document.querySelector('.profile-info__title');
const text = document.querySelector('.profile-info__subtitle');
// находим input редактирующей формы
const nameValue = modalEdit.querySelector('.form__item_name');
const textValue = modalEdit.querySelector('.form__item_text');
// находим input добавочной формы
const designationValue = modalAdd.querySelector('.form__item_designation');
const linkValue = modalAdd.querySelector('.form__item_link');
// находим 3 модалку
const modalImg = document.querySelector('.modal_pic');

const object = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__save-button',
    activeButtonClass: 'form__save-button_invalid',
    inputErrorClass: 'form__item_error',
    errorClass: 'form__input-error'
};

function removeErrors (formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove('form__item_error');
    errorElement.classList.remove('form__input-error');
    errorElement.textContent = '';
};

// обнуление ошибок при открытие добавляющей формы
function addCloseNoError () {
    openModal(modalAdd);
    removeErrors(addForm, designationValue);
    removeErrors(addForm, linkValue);
    addButton.classList.add('form__save-button_invalid');
    addButton.disabled = true;
    addForm.reset();
};

// обнуление ошибок при открытие редактирующей формы
function editCloseNoError () {
    removeErrors(editForm, nameValue);
    removeErrors(editForm, textValue);
    editButton.classList.remove('form__save-button_invalid');
    editButton.disabled = false;
    openModal(modalEdit);
};

// открытие модалки
function openModal(modal) {
    modal.classList.add('modal_opened');
    document.addEventListener('keydown', closeEsc);

}
// закрытие модалки
function closeModal(modal) {
    modal.classList.remove('modal_opened');
    document.removeEventListener('keydown', closeEsc);
}
//закрытие модалки нажатием на кнопку Esc
export function closeEsc(evt) {
    const modalOpened = document.querySelector('.modal_opened');
    if (evt.key === "Escape") {
      closeModal(modalOpened);
    }
  }


//закрытие модалки по клику на оверлей
document.addEventListener ('click', function(evt) {
    if (evt.target === modalEdit) {
        closeModal(modalEdit);
    }
    if (evt.target === modalAdd) {
        closeModal(modalAdd);
        addCloseNoError()
     }
    if (evt.target === modalImg) {
        closeModal(modalImg);
    }
});


// Добавил событие открытия и закрытия к редактирующей форме
openModalButton.addEventListener('click', () => {
    nameValue.value = name.textContent;
    textValue.value = text.textContent;
    openModal(modalEdit);
    editCloseNoError();
});
    
closeModalButton.addEventListener('click', () => {
    closeModal(modalEdit);

}); 
// Добавил событие открытия и закрытия к добавляющей форме
openModalAddButton.addEventListener('click', () => {
    const diactiveSaveButton = modalAdd.querySelector('.form__save-button');
    diactiveSaveButton.classList.add('form__save-button_invalid');
    diactiveSaveButton.disabled = true

    designationValue.value = '';
    linkValue.value = '';
    openModal(modalAdd);
    addCloseNoError();
});
closeModalAddButton.addEventListener('click', () => {
    closeModal(modalAdd);
} );


// Добавление карточки
const formElementAdd = document.querySelector('.modal_add-card');

const cardContainer = document.querySelector('.elements');

function addCardSubmitHandler (evt) {
    evt.preventDefault();
    const card = new Card({name: designationValue.value, link: linkValue.value}, '#template-card');
    const cardElement = card.renderCard();
    cardContainer.prepend(cardElement);
    closeModal (modalAdd);

};

initialCards.forEach((item) => {
    const card = new Card(item, '#template-card');
    const cardElement = card.renderCard();

    document.querySelector('.elements').append(cardElement);
});

// Находим форму в DOM
const formElement = document.querySelector('.modal_edit-profile');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    name.textContent = nameValue.value; 
    text.textContent = textValue.value;
    closeModal(modalEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formElementAdd.addEventListener('submit', addCardSubmitHandler);

const validationEditInput = new FormValidator(modalEdit, object);
const validationAddInput = new FormValidator(modalAdd, object);

validationEditInput.enableValidation();
validationAddInput.enableValidation();
