// Модуль, который отвечает за отрисовку окна с полноразмерным изображением
import {isEscapePressed} from './util.js';
import {clearComments, getComments} from './render-comments.js';

const COMMENTS_COUNT = 5;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');

const commentsCount = bigPicture.querySelector('.comments-count');
const socialCommentsQuantity = bigPicture.querySelector('.comments-quantity');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let shownCommentsCount = 0;
let comments = [];

const onCommentsLoaderClick = () => {
  getComments(getCurrentComments(comments));
};

function getCurrentComments () {
  if (comments.length <= COMMENTS_COUNT) {
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    commentsLoader.classList.add('hidden');
  }

  const currentComments = comments.splice(0, COMMENTS_COUNT);
  shownCommentsCount += currentComments.length;
  socialCommentsQuantity.textContent = shownCommentsCount;

  return currentComments;
}

const renderBigPicture = (picture) => {
  clearComments();
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = `${picture.url}`;
  likesCount.textContent = `${picture.likes}`;
  commentsCount.textContent = `${picture.comments.length}`;
  bigPictureDescription.textContent = `${picture.description}`;

  getComments(getCurrentComments());
};

const onPopupEscKeydown = (evt) => {
  if (isEscapePressed(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onBigPictureCloseButtonClick = () => {
  closeBigPicture();
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  clearComments();

  bigPictureCloseButton.removeEventListener('click', onBigPictureCloseButtonClick);
  document.removeEventListener('keydown', onPopupEscKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

const openBigPicture = (picture) => {
  shownCommentsCount = 0;
  comments = picture.comments.slice();

  commentsLoader.classList.remove('hidden');

  renderBigPicture(picture);

  document.addEventListener('keydown', onPopupEscKeydown);
  bigPictureCloseButton.addEventListener('click', onBigPictureCloseButtonClick);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

export {body, openBigPicture};
