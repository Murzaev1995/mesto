export {Card}
export {initialCards}

const modalImg = document.querySelector('.modal_pic');
const cardImageModal = document.querySelector('.modal__img');
const cardSignatureModal = document.querySelector('.modal__signature');
const closePic = modalImg.querySelector('.modal__close-button');

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

class Card {
    constructor (data) {
        this._text = data.name;
        this._image = data.link;

    }
    _getTemplate() {
        const cardElement = document
            .querySelector('.template-card')
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }
    renderCard() {
        this._element = this._getTemplate();
        this._setEventListener()

        this._element.querySelector('.element__img').src = this._image;
        this._element.querySelector('.element__title').textContent = this._text;


        return this._element;

    }

    _handleOpenPopup() {
        cardImageModal.src = this._image;
        cardSignatureModal.textContent = this._text;
        modalImg.classList.add('modal_opened');
    }
    _handleClosePopup() {
        cardImageModal.src = '';
        cardSignatureModal.textContent = '';
        modalImg.classList.remove('modal_opened');
    }
    _setEventListener() {
        this._element.querySelector('.element__img').addEventListener('click', () => {
            this._handleOpenPopup();
        });
        closePic.addEventListener('click', () => {
            this._handleClosePopup()
        });
        this._element.querySelector('.element__button-like').addEventListener('click', (evt) => {
            evt.target.classList.toggle('element__button-like_pushed');
        });
        this._element.querySelector('.element__button-delete').addEventListener('click', (evt) => {
            evt.target.closest('.element').remove();
        });
    }
}
initialCards.forEach((item) => {
    const card = new Card(item, '.template-card');
    const cardElement = card.renderCard();

    document.querySelector('.elements').append(cardElement);
})