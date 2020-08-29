export {FormValidator}
class FormValidator {
    constructor(formElement, object) {
        this._formElement = formElement;
        this._inputSelector = object.inputSelector;
        this._submitButtonSelector = object.submitButtonSelector;
        this._activeButtonClass = object.activeButtonClass;
        this._inputErrorClass = object.inputErrorClass;
        this._errorClass = object.errorClass;
    }
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };
    _removeInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };
    _checkInputValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage,);
        } else {
            this._removeInputError(inputElement,);
        }
    };
    _eventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValid(inputElement);
                this._toggleButtonState();
            })
        })
    };
    _invalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };
    _toggleButtonState() {
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        if (this._invalidInput()) {
            buttonElement.classList.add(this._activeButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._activeButtonClass);
            buttonElement.disabled = false;
        }
    };
    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._eventListeners();
    }
}
