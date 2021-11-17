import {renderThumbnails} from './render-thumbnails.js';
import {generateUniquePicturesGroup} from './util.js';
import {debounce} from './utils/debounce.js';

const RANDOM_PICTURES_QUANTITY = 10;
const RERENDER_DELAY = 500;

const filtersSection = document.querySelector('.img-filters');
const filtersButtons = filtersSection.querySelectorAll('.img-filters__button');

const getRandomPictures = (pictures) => generateUniquePicturesGroup(pictures, RANDOM_PICTURES_QUANTITY);

const getDefaultPictures = (pictures) => pictures.slice();

const getDiscussedPictures = (pictures) => pictures.slice().sort((comment1, comment2) => comment2.comments.length - comment1.comments.length);

const removeClass = () => {
  filtersButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
};

const getPictures = () => document.querySelectorAll('.picture');

const removePictures = () => {
  getPictures().forEach((picture) => picture.remove());
};

const renderFilterPictures = (pictures) => {
  removePictures();
  renderThumbnails(pictures);
};

const filterPictures = (pictures) => {
  filtersSection.classList.remove('img-filters--inactive');

  filtersButtons.forEach((button) => {

    button.addEventListener('click',
      debounce((evt) => {
        removeClass();
        evt.target.classList.add('img-filters__button--active');
        if (evt.target.matches('#filter-default')) {
          renderFilterPictures(getDefaultPictures(pictures));
        } else if (evt.target.matches('#filter-random')) {
          renderFilterPictures(getRandomPictures(pictures));
        } else if (evt.target.matches('#filter-discussed')) {
          renderFilterPictures(getDiscussedPictures(pictures));
        }
      },

      RERENDER_DELAY),
    );
  });
};

export {filterPictures};
