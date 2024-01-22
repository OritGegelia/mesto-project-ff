export { clearValidation, enableValidation };

// Запускает валидацию всего и вся.

function enableValidation(validationSettingsObject) {
  const formList = Array.from(
    document.querySelectorAll(validationSettingsObject.myForm)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationSettingsObject);
  });
}

// Очистить ошибки валидации

const clearValidation = (formElement, validationSettingsObject) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettingsObject.popupInput)
  );

  const buttonElement = formElement.querySelector(
    validationSettingsObject.popupButton
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettingsObject);
  });

  toggleButtonState(inputList, buttonElement);
};

// Показать ошибку

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationSettingsObject
) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationSettingsObject.inputError);
  formError.textContent = errorMessage;
  formError.classList.add(validationSettingsObject.inputTextError);
};

//  Скрыть ошибку

const hideInputError = (
  formElement,
  inputElement,
  validationSettingsObject
) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationSettingsObject.inputError);
  formError.textContent = "";
  formError.classList.remove(validationSettingsObject.inputTextError);
};

// Проверка формы на валидность

const formIsValid = (formElement, inputElement, validationSettingsObject) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationSettingsObject
    );
  } else {
    hideInputError(formElement, inputElement, validationSettingsObject);
  }
};

// Блокировка кнопки при невалидных данных

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  buttonElement.disabled = hasInvalidInput(inputList);
};

// Навешиватель слушателей на все инпуты.

const setEventListeners = (formElement, validationSettingsObject) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettingsObject.popupInput)
  );
  const buttonElement = formElement.querySelector(
    validationSettingsObject.popupButton
  );

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      formIsValid(formElement, inputElement, validationSettingsObject);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
