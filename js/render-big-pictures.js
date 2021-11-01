// Модуль, который отвечает за отрисовку окна с полноразмерным изображением
import {isEscapePressed} from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialСommentsContainer = bigPicture.querySelector('.social__comments');
const bigPictureComment = socialСommentsContainer.querySelector('.social__comment');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const clearComments = () => {
  socialСommentsContainer.innerHTML = '';
};

clearComments();

const getComments = (comment) => {
  const bigPictureCommentFragment = bigPictureComment.cloneNode(true);

  const socialPicture = bigPictureCommentFragment.querySelector('.social__picture');
  const socialText = bigPictureCommentFragment.querySelector('.social__text');

  socialPicture.src = `${comment.avatar}`;
  socialPicture.alt = `${comment.name}`;
  socialText.textContent = `${comment.message}`;
  socialСommentsContainer.append(bigPictureCommentFragment);
};

const renderBigPicture = (picture) => {
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

const closeOnEscape = (event) => {
  if (isEscapePressed(event)) {
    event.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (event, picture) => {
  event.preventDefault();
  renderBigPicture(picture);

  document.addEventListener('keydown', closeOnEscape);
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  clearComments();

  document.removeEventListener('keydown', closeOnEscape);
}

bigPictureCloseButton.addEventListener('click', closeBigPicture);

export {openBigPicture};
