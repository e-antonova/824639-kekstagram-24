import {isEscapePressed} from './util.js';

const SUCCESS_MESSAGE_BACKGROUND = 'rgb(177, 255, 154, 0.5)';
const ERROR_MESSAGE_BACKGROUND = 'rgb(227, 66, 52, 0.5)';
const MESSAGES_ZINDEX = 10;
const ALERT_SHOW_TIME = 5000;

const alertContainer = document.createElement('div');

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageContainer = successMessageTemplate.cloneNode(true);
const successCloseButton = successMessageContainer.querySelector('.success__button');
const successMessageTemplateInner = successMessageContainer.querySelector('.success__inner');

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageContainer = errorMessageTemplate.cloneNode(true);
const errorCloseButton = errorMessageContainer.querySelector('.error__button');
const errorMessageTemplateInner = errorMessageContainer.querySelector('.error__inner');

const showServerErrorMessage = (message) => {
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
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
  successMessageContainer.style.zIndex = MESSAGES_ZINDEX;
  successMessageTemplateInner.style.backgroundColor = SUCCESS_MESSAGE_BACKGROUND;

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
  errorMessageContainer.style.zIndex = MESSAGES_ZINDEX;
  errorMessageTemplateInner.style.backgroundColor = ERROR_MESSAGE_BACKGROUND;

  errorCloseButton.addEventListener('click', onErrorCloseButtonClick);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
};

function closeErrorMessage() {
  errorMessageContainer.remove();
  errorCloseButton.removeEventListener('click', onErrorCloseButtonClick);
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
}

export {showServerErrorMessage, openErrorMessage, openSuccessMessage};
