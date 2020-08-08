const object = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__save-button',
    activeButtonClass: 'form__save-button_invalid',
    inputErrorClass: 'form__item_error',
    errorClass: 'form__input-error'
  };
  

  const enableValidation = (obj) => {
      const forms = Array.from(document.querySelectorAll(obj.formSelector));
      forms.forEach((formElement) => {
          formElement.addEventListener('submit', (evt) =>{
              evt.preventDefault();
          });
          eventListeners(formElement, obj);
      });
  };

  const showInputError = (formElement, inputElement, errorMessage, obj) => {
            const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
            inputElement.classList.add(obj.inputErrorClass);
            errorElement.textContent = errorMessage;
            errorElement.classList.add(obj.errorClass);
        };
        
   const removeInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
   };
        
  const checkInputValid = (formElement, inputElement, obj) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
      removeInputError(formElement, inputElement, obj);
    };
  };

  const eventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, obj);
  
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValid(formElement, inputElement, obj);
        toggleButtonState(inputList, buttonElement, obj);
      });
    });
  };

  const invalidInput = (inputList) => {
    return inputList.some((inputElements) => {
      return !inputElements.validity.valid;
    })
  };

  const toggleButtonState = (inputList, buttonElement, obj) => {
    if (invalidInput(inputList)) {
      buttonElement.classList.add(obj.activeButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(obj.activeButtonClass);
      buttonElement.disabled = false;
    }
  }
  enableValidation(object);