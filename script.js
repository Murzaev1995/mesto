const OpenModelButton = document.querySelector('.profile-info__edit-button');
const ClouseModalButton = document.querySelector('.modal__clouse-button');
const modal = document.querySelector('.modal');
const name = document.querySelector('.profile-info__title');
const text = document.querySelector('.profile-info__subtitle');
const nameValue = document.querySelector('.form__item_name');
const textValue = document.querySelector('.form__item_text');

function OpenModal () {
    modal.classList.add ('modal_opened');
    nameValue.value = name.textContent;
    textValue.value = text.textContent
    
    

}


function ClouseModal () {
    modal.classList.remove ('modal_opened');
}




// Находим форму в DOM
let formElement = document.querySelector('.modal');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    

    name.textContent = nameValue.value;
    text.textContent = textValue.value;
    ClouseModal();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
OpenModelButton.addEventListener('click', OpenModal);
ClouseModalButton.addEventListener('click', ClouseModal);
formElement.addEventListener('submit', formSubmitHandler);