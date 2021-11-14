import {isEscapePressed} from './util.js';

const alertMessageContainer = document.createElement('div');

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageContainer = successMessageTemplate.cloneNode(true);
const successCloseButton = successMessageContainer.querySelector('.success__button');

const errorMessageTemplate = document.querySelector('#error').content;
const errorMessageContainer = errorMessageTemplate.cloneNode(true);
const errorCloseButton = errorMessageContainer.querySelector('.error__button');

const loadingMessageTemplate = document.querySelector('#messages').content;
const loadingMessageContainer = loadingMessageTemplate.cloneNode(true);

const showServerErrorMessage = (message) => {
  alertMessageContainer.style.position = 'absolute';
  alertMessageContainer.style.top = 0;
  alertMessageContainer.style.left = 0;
  alertMessageContainer.style.right = 0;
  alertMessageContainer.style.zIndex = 10;
  alertMessageContainer.style.padding = '15px 10px';
  alertMessageContainer.style.backgroundColor = '#ff7f7f';
  alertMessageContainer.style.textAlign = 'center';
  alertMessageContainer.style.fontSize = '28px';
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
};

const openErrorMessage = () => {
  document.body.append(errorMessageContainer);
  errorMessageContainer.style.zIndex = 10;

  errorCloseButton.addEventListener('click', onErrorCloseButtonClick);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
};

function closeErrorMessage() {
  errorMessageContainer.remove();
  errorCloseButton.removeEventListener('click', onErrorCloseButtonClick);
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
}

const showLoadingMessage = () => {
  document.body.append(loadingMessageContainer);
  loadingMessageContainer.style.zIndex = 10;
};

const removeLoadingMessage = () => {
  loadingMessageContainer.remove();
};

export {showServerErrorMessage, openErrorMessage, openSuccessMessage, showLoadingMessage, removeLoadingMessage};
