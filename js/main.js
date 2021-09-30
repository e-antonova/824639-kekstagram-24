// Пользовалась источником https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomPositiveIntInclusive(min, max) {
  if (max < min) {
    const tmp = max;
    max = min;
    min = tmp;
  }

  if (min < 0) {
    min = 0;
  }

  if (max < 0) {
    max = 0;
  }

  if (min === max) {
    return min;
  }

  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);

  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

getRandomPositiveIntInclusive(1, 12);

function checkCommentLength(comment, maxLength) {
  return comment.length <= maxLength;
}

checkCommentLength('string', 10);
