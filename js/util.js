// модуль с вспомогательными функциями
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const generateUniquePicturesGroup = (pictures, quantity) => {
  const uniquePictures = [];
  let count = 0;
  while (count < quantity) {
    let randomPicture = pictures[getRandomPositiveInteger(1, pictures.length - 1)];

    while (uniquePictures.some((pic) => pic.id === randomPicture.id)) {
      randomPicture = pictures[getRandomPositiveInteger(1, pictures.length - 1)];
    }
    uniquePictures.push(randomPicture);
    count++;
  }
  return uniquePictures;
};

const checkCommentLength = (comment, maxLength) => comment.length <= maxLength;

const isEscapePressed = (evt) => evt.key === 'Escape';

export {getRandomPositiveInteger, checkCommentLength, isEscapePressed, generateUniquePicturesGroup};
