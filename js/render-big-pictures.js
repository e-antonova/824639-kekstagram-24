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
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsQuantity = bigPicture.querySelector('.comments-quantity');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const renderBigPicture = (picture) => {
  clearComments();
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  socialCommentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  let shownCommentsCount = 0;
  let showMoreCounter = 0;

  const onCommentsLoaderClick = () => {
    const moreComments = [];

    if (picture.comments.length - (COMMENTS_COUNT * showMoreCounter) > COMMENTS_COUNT) {
      for (let i = (COMMENTS_COUNT * showMoreCounter); i < (COMMENTS_COUNT * showMoreCounter) + COMMENTS_COUNT; i++) {
        moreComments.push(picture.comments[i]);
      }
      showMoreCounter++;
    } else {
      for (let i = (COMMENTS_COUNT * showMoreCounter); i < picture.comments.length; i++) {
        moreComments.push(picture.comments[i]);
      }
      commentsLoader.removeEventListener('click', onCommentsLoaderClick);
      commentsLoader.classList.add('hidden');
    }

    moreComments.forEach(getComments);
    shownCommentsCount = shownCommentsCount + moreComments.length;
    socialCommentsQuantity.textContent = shownCommentsCount;
  };

  bigPictureImg.src = `${picture.url}`;
  likesCount.textContent = `${picture.likes}`;
  commentsCount.textContent = `${picture.comments.length}`;
  bigPictureDescription.textContent = `${picture.description}`;

  let commmentsToRender = [];
  if (picture.comments.length >= COMMENTS_COUNT) {
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
    for (let i = 0; i < COMMENTS_COUNT; i++) {
      commmentsToRender.push(picture.comments[i]);
    }
    showMoreCounter++;
  } else {
    commmentsToRender = picture.comments;
  }

  commmentsToRender.forEach(getComments);
  shownCommentsCount = commmentsToRender.length;
  socialCommentsQuantity.textContent = shownCommentsCount;
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
}

const openBigPicture = (evt, picture) => {
  evt.preventDefault();
  renderBigPicture(picture);

  document.addEventListener('keydown', onPopupEscKeydown);

  bigPictureCloseButton.addEventListener('click', onBigPictureCloseButtonClick);
};

export {body, openBigPicture};
