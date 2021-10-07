function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function checkCommentLength(comment, maxLength) {
  return comment.length <= maxLength;
}

checkCommentLength('string', 10);

const DESCRIPTIONS = [
  'Эта фотография – мой шедевр',
  'Записываемся на фотосессию',
  'Сразу видно руку мастера',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Антон',
  'Мария',
  'Виктор',
  'Игорь',
  'Светлана',
  'Яна',
];

const createUserPhotoDescription = () => {
  let idOfPhoto = 0;
  let urlIndex = 0;
  let avatarIndex = 0;
  const uniqueIdOfComment = [];

  const createUserComment = () => {
    const randomMessageIndex = getRandomPositiveInteger(0, MESSAGES.length - 1);
    const randomNameIndex = getRandomPositiveInteger(0, NAMES.length - 1);

    let randomIdOfComment = getRandomPositiveInteger(1, 135);
    while ((uniqueIdOfComment.includes(randomIdOfComment)) === true) {
      randomIdOfComment = getRandomPositiveInteger(0, 135);
    }
    uniqueIdOfComment.push(randomIdOfComment);

    return {
      id: randomIdOfComment,
      avatar: `img/avatar-${avatarIndex += 1}.svg`,
      message: `${MESSAGES[randomMessageIndex]  } `,
      name: `${NAMES[randomNameIndex]  } `,
    };
  };

  const createPhotoDescriptionObject = () => {
    const randomDescriptionIndex = getRandomPositiveInteger(0, DESCRIPTIONS.length - 1);
    const randomLikesNumber = getRandomPositiveInteger(15, 200);

    return {
      id: idOfPhoto += 1,
      url: `photos/${urlIndex += 1}.jpg`,
      description: `${DESCRIPTIONS[randomDescriptionIndex]} `,
      likes: randomLikesNumber,
      comments: Array.from({length: 4}, createUserComment),
    };
  };

  const createPhotoDescriptionArray = Array.from({length: 25}, createPhotoDescriptionObject);

  return createPhotoDescriptionArray;
};

createUserPhotoDescription();
