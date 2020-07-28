const modalEdit = document.querySelector('.modal_edit-profile');
const modalAdd = document.querySelector('.modal_add-card');
const OpenModelButton = document.querySelector('.profile-info__edit-button');
const ClouseModalButton = document.querySelector('.modal__clouse-button');
const OpenModalAddButton = document.querySelector('.profile__add-button');
const ClouseModalAddButton = modalAdd.querySelector('.modal__clouse-button');
const name = document.querySelector('.profile-info__title');
const text = document.querySelector('.profile-info__subtitle');
// находим input редактирующей формы
const nameValue = modalEdit.querySelector('.form__item_name');
const textValue = modalEdit.querySelector('.form__item_text');
// находим input добавочной формы
const designationValue = modalAdd.querySelector('.form__item_designation');
const linkValue = modalAdd.querySelector('.form__item_link');
// находим 3 модалку
const modalImg = document.querySelector('.modal_pic')
const clousePic = modalImg.querySelector('.modal__clouse-button')

// открытие и закрытие редактирующей формы
function OpenModal () {
    modalEdit.classList.add ('modal_opened');
    nameValue.value = name.textContent;
    textValue.value = text.textContent;
}

function ClouseModal () {
    modalEdit.classList.remove ('modal_opened');
}

// открытие и закрытие добавочной формы
function OpenAddModal () {
    modalAdd.classList.add ('modal_opened');
}

function ClouseAddModal () {
    modalAdd.classList.remove ('modal_opened');
}
// открытие и закрытие картинки
function OpenPicModal(){
    modalImg.classList.add('modal_opened')
}
function ClousePicModal(){
    modalImg.classList.remove('modal_opened')
}




// Добавление карточки
let formElementAdd = document.querySelector('.modal_add-card');

function addCardSubmitHandler (evt) {
    evt.preventDefault();
    console.log(designationValue.value, linkValue.value)
    renderCard({name: designationValue.value, link: linkValue.value})

    ClouseAddModal (modalAdd);
}

// Находим форму в DOM
let formElement = document.querySelector('.modal_edit-profile');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    

    name.textContent = nameValue.value;
    text.textContent = textValue.value;
    ClouseModal(modalEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
OpenModelButton.addEventListener('click', OpenModal);
OpenModalAddButton.addEventListener('click', OpenAddModal);
ClouseModalButton.addEventListener('click', ClouseModal);
ClouseModalAddButton.addEventListener('click', ClouseAddModal);

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
const card = document.querySelector('.elements');

function renderCard(data) {
   
    card.prepend(createCard(data));

}

function createCard(data) {
    const cardTemplate = document.querySelector('.template-card').content.querySelector('.element');
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.element__img');
    const cardTitle = cardElement.querySelector('.element__title');
    const cardLikeButton = cardElement.querySelector('.element__button-like');
    const cardDeleteButton = cardElement.querySelector('.element__button-delete');
    const cardImageModal = document.querySelector('.modal__img')
    const cardSignatureModal = document.querySelector('.modal__signature')
    
    
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
        toggleModal(modalPicture);
      });

      cardImage.addEventListener('click', OpenPicModal);
      clousePic.addEventListener('click', ClousePicModal);
    return cardElement;

    
    
    

  
    
    
}



initialCards.forEach((data) => {
    renderCard(data);

    

})



  