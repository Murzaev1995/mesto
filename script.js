// Объявил переменные редактирующей модалки
const modalEdit = document.querySelector('.modal_edit-profile');
const openModelButton = document.querySelector('.profile-info__edit-button');
const closeModalButton = document.querySelector('.modal__close-button');

// Объявил переменные добавляющей модалки
const modalAdd = document.querySelector('.modal_add-card');
const openModalAddButton = document.querySelector('.profile__add-button');
const closeModalAddButton = modalAdd.querySelector('.modal__close-button');

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
const closePic = modalImg.querySelector('.modal__close-button');
const cardTemplate = document.querySelector('.template-card').content.querySelector('.element');
const cardImageModal = document.querySelector('.modal__img');
const cardSignatureModal = document.querySelector('.modal__signature');

// открытие и закрытие редактирующей формы
function toggleEditModal() {
    modalEdit.classList.toggle('modal_opened')
}

// открытие и закрытие добавочной формы
function toggleAddModal() {
    modalAdd.classList.toggle('modal_opened')
}
// открытие и закрытие картинки
function togglePicModal(){
    modalImg.classList.toggle('modal_opened')
}


    nameValue.value = name.textContent;
    textValue.value = text.textContent;


// Добавление карточки
const formElementAdd = document.querySelector('.modal_add-card');

const card = document.querySelector('.elements');

function renderCard(data) {
   
    card.prepend(createCard(data));

}
function addCardSubmitHandler (evt) {
    evt.preventDefault();
    renderCard({name: designationValue.value, link: linkValue.value});
    toggleAddModal (modalAdd);
}

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
    openCloseModal(modalEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

// Добавил событие открытия и закрытия к редактирующей форме
openModelButton.addEventListener('click', toggleEditModal);
closeModalButton.addEventListener('click', toggleEditModal);

// Добавил событие открытия и закрытия к добавляющей форме
openModalAddButton.addEventListener('click', toggleAddModal);
closeModalAddButton.addEventListener('click', toggleAddModal);

formElement.addEventListener('submit', formSubmitHandler);
formElementAdd.addEventListener('submit', addCardSubmitHandler);


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


function createCard(data) {
    
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.element__img');
    const cardTitle = cardElement.querySelector('.element__title');
    const cardLikeButton = cardElement.querySelector('.element__button-like');
    const cardDeleteButton = cardElement.querySelector('.element__button-delete');
    
    
    
    
    cardLikeButton.addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__button-like_pushed');
    });

    cardDeleteButton.addEventListener('click', function(evt) {
        evt.target.closest('.element').remove();
    });
    

    cardTitle.textContent = data.name;
    cardImage.src = data.link;
    
    
    cardImage.addEventListener('click', () => {
        cardImageModal.src = data.link;
        cardSignatureModal.textContent = data.name;
        cardImage.addEventListener('click', togglePicModal);
      });

      
      
    return cardElement;
}

closePic.addEventListener('click', togglePicModal);

initialCards.forEach((data) => {
    renderCard(data);
})