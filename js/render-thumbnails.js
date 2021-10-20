// Модуль, который отвечает за отрисовку миниатюр
import {createUserPhotos} from './data.js';

const photosQuantity = 25;
const photos = createUserPhotos(photosQuantity);

const picturesContainer = document.querySelector('.pictures');
const pictureFragment = document.querySelector('#picture').content;
const pictureTemplate = pictureFragment.querySelector('.picture');

const renderThumbnails = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < photos.length; i++) {
    const pictureItem = pictureTemplate.cloneNode(true);

    const pictureImg = pictureItem.querySelector('.picture__img');
    const pictureLikes = pictureItem.querySelector('.picture__likes');
    const pictureComments = pictureItem.querySelector('.picture__comments');

    pictureImg.src = photos[i].url;
    pictureLikes.textContent = photos[i].likes;
    pictureComments.textContent = photos[i].comments.length;

    fragment.appendChild(pictureItem);
  }

  picturesContainer.appendChild(fragment);
};

export {renderThumbnails};
