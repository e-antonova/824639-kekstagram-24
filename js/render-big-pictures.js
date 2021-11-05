// Модуль, который отвечает за отрисовку окна с полноразмерным изображением
import {isEscapePressed} from './util.js';
import {clearComments, getComments} from './render-comments.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const renderBigPicture = (picture) => {
  clearComments();
  bigPicture.classList.remove('hidden');
  socialCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = `${picture.url}`;
  likesCount.textContent = `${picture.likes}`;
  commentsCount.textContent = `${picture.comments.length}`;
  bigPictureDescription.textContent = `${picture.description}`;

  picture.comments.forEach(getComments);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  clearComments();

  // eslint-disable-next-line no-use-before-define
  bigPictureCloseButton.removeEventListener('click', onBigPictureCloseButtonClick);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const onBigPictureCloseButtonClick = () => {
  closeBigPicture();
};

const onPopupEscKeydown = (evt) => {
  if (isEscapePressed(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (evt, picture) => {
  evt.preventDefault();
  renderBigPicture(picture);

  document.addEventListener('keydown', onPopupEscKeydown);

  bigPictureCloseButton.addEventListener('click', onBigPictureCloseButtonClick);
};

export {openBigPicture};
