// модуль, который создаёт данные
import {getRandomPositiveInteger} from './util.js';

const descriptions = [
  'Эта фотография – мой шедевр',
  'Записываемся на фотосессию',
  'Сразу видно руку мастера',
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
  'Антон',
  'Мария',
  'Виктор',
  'Игорь',
  'Светлана',
  'Яна',
];

const uniqueCommentIds = [];
const photosQuantity = 25;
let idOfPhoto = 0;
let urlIndex = 0;

const getRandomMessage = () => messages[getRandomPositiveInteger(0, messages.length - 1)];

const getRandomDescription = () => descriptions[getRandomPositiveInteger(0, descriptions.length - 1)];

const getRandomName = () => names[getRandomPositiveInteger(0, names.length - 1)];

const generateUniqueCommentId = () => {
  let randomCommentId = getRandomPositiveInteger(1, Number.MAX_SAFE_INTEGER);
  while (uniqueCommentIds.includes(randomCommentId)) {
    randomCommentId = getRandomPositiveInteger(1, Number.MAX_SAFE_INTEGER);
  }
  uniqueCommentIds.push(randomCommentId);
  return randomCommentId;
};

const createUserComment = () => ({
  id: generateUniqueCommentId(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomMessage(),
  name: getRandomName(),
});

const createPhotoDescription = () => ({
  id: idOfPhoto += 1,
  url: `photos/${urlIndex += 1}.jpg`,
  description: getRandomDescription(),
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from({length: getRandomPositiveInteger(1, 10)}, createUserComment),
});

const createUserPhotos = (numberOfPhotos) => Array.from({length: numberOfPhotos}, createPhotoDescription);

export {createUserPhotos, photosQuantity};
