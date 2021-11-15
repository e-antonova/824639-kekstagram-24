// Модуль, который отвечает за отрисовку миниатюр
import {openBigPicture} from './render-big-pictures.js';

const picturesContainer = document.querySelector('.pictures');
const pictureFragment = document.querySelector('#picture').content;
const pictureTemplate = pictureFragment.querySelector('.picture');

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureItem = pictureTemplate.cloneNode(true);

    const pictureImg = pictureItem.querySelector('.picture__img');
    const pictureLikes = pictureItem.querySelector('.picture__likes');
    const pictureComments = pictureItem.querySelector('.picture__comments');

    pictureImg.src = photo.url;
    pictureLikes.textContent = photo.likes;
    pictureComments.textContent = photo.comments.length;

    fragment.appendChild(pictureItem);

    pictureItem.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });
  });

  picturesContainer.appendChild(fragment);
};

export {renderThumbnails};
