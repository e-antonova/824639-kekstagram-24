// Модуль, который отвечает за за работу с формой
import {body} from './render-big-pictures.js';
import {isEscapePressed, checkCommentLength} from './util.js';
import {scaleControl, onScaleControlClick, resetImageScale, onEffectsChange, unsetEffect} from './edit-picture.js';
import {sendServerData} from './api.js';
import {openErrorMessage, openSuccessMessage} from './info-messages.js';

const FIRST_SYMBOL_HASHTAG = '#';
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_LENGTH = 5;
const MAX_COMMENTS_LENGTH = 140;

const regExp = /^#[A-Za-zА-Яа-яЁё0-9]*$/;
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFileField = imgUploadForm.querySelector('#upload-file');
const editImgForm = imgUploadForm.querySelector('.img-upload__overlay');
const uploadImgCancelButton = imgUploadForm.querySelector('#upload-cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const effectsList = document.querySelector('.effects__list');

const onFormEscKeydown = (evt) => {
  if (isEscapePressed(evt)) {
    evt.preventDefault();
    closeEditImgForm();
  }
};

const onUploadImgCancelButtonClick = () => {
  closeEditImgForm();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendServerData(
    () => closeEditImgForm(),
    () => openSuccessMessage(),
    () => openErrorMessage(),
    new FormData(evt.target),
  );
};

const onEditImgFormOpen = () => {
  editImgForm.classList.remove('hidden');
  body.classList.add('modal-open');

  resetImageScale();
  unsetEffect();

  scaleControl.addEventListener('click', onScaleControlClick);
  uploadImgCancelButton.addEventListener('click', onUploadImgCancelButtonClick);
  effectsList.addEventListener('change', onEffectsChange);
  document.addEventListener('keydown', onFormEscKeydown);
  imgUploadForm.addEventListener('submit', onFormSubmit);
};

const activateFileLoader = () => {
  uploadFileField.addEventListener('change', onEditImgFormOpen);
};

function closeEditImgForm() {
  editImgForm.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFileField.value = '';
  imgUploadForm.reset();

  scaleControl.removeEventListener('click', onScaleControlClick);
  uploadImgCancelButton.removeEventListener('click', onUploadImgCancelButtonClick);
  effectsList.removeEventListener('change', onEffectsChange);
  document.removeEventListener('keydown', onFormEscKeydown);
  imgUploadForm.removeEventListener('submit', onFormSubmit);
}

const getHashtagInLowerCase = (elements) => elements.map((element) => element.toLowerCase());

const checkIfDuplicateExists = (tags) => new Set(getHashtagInLowerCase(tags)).size !== getHashtagInLowerCase(tags).length;

const checkHashtagFieldValidation = () => {
  hashtagField.setCustomValidity('');

  if (hashtagField.value !== '') {
    const hashtags = hashtagField.value.split(' ');

    if(hashtags.some((item) => !item.startsWith(FIRST_SYMBOL_HASHTAG))) {
      hashtagField.setCustomValidity(`Хэш-тег должен начинаться с символа ${FIRST_SYMBOL_HASHTAG} (решётка)`);
    } else if (hashtags.some((item) => !regExp.test(item))) {
      hashtagField.setCustomValidity('Хэш-тег может состоять только из букв и чисел');
    } else if (hashtags.some((item) => item === FIRST_SYMBOL_HASHTAG)) {
      hashtagField.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
    } else if (hashtags.some((item) => item.length > MAX_HASHTAG_LENGTH)) {
      hashtagField.setCustomValidity(`Максимальная длина хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`);
    } else if (hashtags.length > MAX_HASHTAGS_LENGTH) {
      hashtagField.setCustomValidity(`Нельзя указать больше ${MAX_HASHTAGS_LENGTH} хэш-тегов`);
    } else if (checkIfDuplicateExists(hashtags)) {
      hashtagField.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    } else {
      hashtagField.setCustomValidity('');
    }
  }
  hashtagField.reportValidity();
};
const onHashtagFieldInput = () => {
  checkHashtagFieldValidation();
};

hashtagField.addEventListener('input', onHashtagFieldInput);

hashtagField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

const checkCommentValidition = () => {
  const commentFieldValue = commentField.value;
  if (!checkCommentLength(commentFieldValue, MAX_COMMENTS_LENGTH)) {
    commentField.setCustomValidity(`Комментарий не может быть длиннее ${MAX_COMMENTS_LENGTH} символов`);
  } else {
    commentField.setCustomValidity('');
  }
  commentField.reportValidity();
};

const onCommentFieldInput = () => {
  checkCommentValidition();
};

commentField.addEventListener('input', onCommentFieldInput);

commentField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

export {activateFileLoader};
