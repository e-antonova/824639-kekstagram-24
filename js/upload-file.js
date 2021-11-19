// Модуль для функционала загрузки своего изображения
import {imgUploadPreview} from './edit-picture.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const effectsPreview = document.querySelectorAll('.effects__preview');

const uploadFile = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((fileTipe) => fileName.endsWith(fileTipe));

  const fileUrl = URL.createObjectURL(file);

  if (matches) {
    imgUploadPreview.src = fileUrl;
  }

  effectsPreview.forEach((item) => {
    item.style.backgroundImage = `url(${fileUrl})`;
  });
};

export {fileChooser, uploadFile};
