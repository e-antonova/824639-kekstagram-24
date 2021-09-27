// Пользовалась источником https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

getRandomInt(1, 100);

function checkCommentLength(comment, maxLength) {
  return comment.length <= maxLength;
}

checkCommentLength('string', 10);
