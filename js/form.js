// Модуль, который отвечает за за работу с формой
import {body} from './render-big-pictures.js';
import {isEscapePressed, checkCommentLength} from './util.js';

const FIRST_SYMBOL_HASHTAG = '#';
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_LENGTH = 5;
const MAX_COMMENTS_LENGTH = 140;

const regExp = /^#[A-Za-zА-Яа-яЁё0-9]*$/;
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = imgUploadForm.querySelector('#upload-file');
const editImgForm = imgUploadForm.querySelector('.img-upload__overlay');
const uploadImgCancelButton = imgUploadForm.querySelector('#upload-cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const onFormEscKeydown = (evt) => {
  if (isEscapePressed(evt)) {
    evt.preventDefault();
    closeEditImgForm();
  }
};

const onRemoveKeyDown = () => {
  document.removeEventListener('keydown', onFormEscKeydown);
};

const  onAddKeyDown = () => {
  document.addEventListener('keydown', onFormEscKeydown);
};

const onUploadImgCancelButtonClick = () => {
  closeEditImgForm();
};

const onEditImgFormOpen = () => {
  editImgForm.classList.remove('hidden');
  body.classList.add('modal-open');

  uploadImgCancelButton.addEventListener('click', onUploadImgCancelButtonClick);
  onAddKeyDown();
};

uploadFileInput.addEventListener('change', onEditImgFormOpen);

function closeEditImgForm() {
  editImgForm.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFileInput.value = '';

  uploadImgCancelButton.removeEventListener('click', onUploadImgCancelButtonClick);
  onRemoveKeyDown();
}

const getHashtagInLowerCase = (elements) => elements.map((element) => element.toLowerCase());

const checkIfDuplicateExists = (tags) => new Set(getHashtagInLowerCase(tags)).size !== getHashtagInLowerCase(tags).length;

const onValidateHashtagInput = () => {
  hashtagInput.setCustomValidity('');

  if (hashtagInput.value !== '') {
    const hashtags = hashtagInput.value.split(' ');

    hashtags.forEach((hashtag) => {
      if (!hashtag.startsWith(FIRST_SYMBOL_HASHTAG)) {
        hashtagInput.setCustomValidity(`Хэш-тег должен начинаться с символа ${FIRST_SYMBOL_HASHTAG} (решётка)`);
      } else if (!regExp.test(hashtag)) {
        hashtagInput.setCustomValidity('Хэш-тег может состоять только из букв и чисел');
      } else if (hashtag === FIRST_SYMBOL_HASHTAG) {
        hashtagInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
        hashtagInput.setCustomValidity(`Максимальная длина хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`);
      } else if (hashtag.length < MIN_HASHTAG_LENGTH) {
        hashtagInput.setCustomValidity(`Хештег не может быть короче ${MIN_HASHTAG_LENGTH} символов`);
      } else if (hashtags.length > MAX_HASHTAGS_LENGTH) {
        hashtagInput.setCustomValidity(`Нельзя указать больше ${MAX_HASHTAGS_LENGTH} хэш-тегов`);
      } else if (checkIfDuplicateExists(hashtags)) {
        hashtagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      } else {
        hashtagInput.setCustomValidity('');
      }
    });
  }

  hashtagInput.reportValidity();
};

hashtagInput.addEventListener('input', onValidateHashtagInput);

hashtagInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

const checkCommentValidition = () => {
  const commentInputValue = commentInput.value;
  if (!checkCommentLength(commentInputValue, MAX_COMMENTS_LENGTH)) {
    commentInput.setCustomValidity(`Комментарий не может быть длиннее ${MAX_COMMENTS_LENGTH} символов`);
  } else {
    commentInput.setCustomValidity('');
  }
  commentInput.reportValidity();
};

const onValidateCommentInput = () => {
  checkCommentValidition();
};

commentInput.addEventListener('input', onValidateCommentInput);

commentInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
