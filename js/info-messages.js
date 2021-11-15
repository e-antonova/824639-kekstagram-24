import {isEscapePressed} from './util.js';
import {closeEditImgForm} from './form.js';

const alertMessageContainer = document.createElement('div');

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageContainer = successMessageTemplate.cloneNode(true);
const successCloseButton = successMessageContainer.querySelector('.success__button');
const successMessageTemplateInner = successMessageContainer.querySelector('.success__inner');

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageContainer = errorMessageTemplate.cloneNode(true);
const errorCloseButton = errorMessageContainer.querySelector('.error__button');
const errorMessageTemplateInner = errorMessageContainer.querySelector('.error__inner');

const showServerErrorMessage = (message) => {
  alertMessageContainer.textContent = message;

  document.body.append(alertMessageContainer);
};

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscapePressed(evt)) {
    evt.preventDefault();
    closeMessageSuccess();
  }
};

const onSuccessCloseButtonClick = () => {
  closeMessageSuccess();
};

function closeMessageSuccess () {
  successMessageContainer.remove();
  successCloseButton.removeEventListener('click', onSuccessCloseButtonClick);
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
}

const openSuccessMessage = () => {
  document.body.append(successMessageContainer);
  successMessageContainer.style.zIndex = 10;
  successMessageTemplateInner.style.backgroundColor = 'rgb(177, 255, 154, 0.5)';

  successCloseButton.addEventListener('click', onSuccessCloseButtonClick);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
};

const onErrorMessageEscKeydown = (evt) => {
  if (isEscapePressed(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const onErrorCloseButtonClick = () => {
  closeErrorMessage();
  closeEditImgForm();
};

const openErrorMessage = () => {
  document.body.append(errorMessageContainer);
  errorMessageContainer.style.zIndex = 10;
  errorMessageTemplateInner.style.backgroundColor = 'rgb(227, 66, 52, 0.5)';

  errorCloseButton.addEventListener('click', onErrorCloseButtonClick);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
};

function closeErrorMessage() {
  errorMessageContainer.remove();
  errorCloseButton.removeEventListener('click', onErrorCloseButtonClick);
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
}

export {showServerErrorMessage, openErrorMessage, openSuccessMessage};
