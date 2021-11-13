// Модуль для генерации комментариев
const socialСommentsContainer = document.querySelector('.social__comments');
const commentTemplateFragment = document.querySelector('#comment').content;
const commentTemplate = commentTemplateFragment.querySelector('li');

const clearComments = () => {
  socialСommentsContainer.innerHTML = '';
};

const getComment = (item, fragment) => {
  const comment = commentTemplate.cloneNode(true);

  const socialPicture = comment.querySelector('.social__picture');
  const socialText = comment.querySelector('.social__text');

  socialPicture.src = `${item.avatar}`;
  socialPicture.alt = `${item.name}`;
  socialText.textContent = `${item.message}`;

  fragment.append(comment);
};

const getComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((item) => getComment(item, fragment));

  socialСommentsContainer.append(fragment);
};

export {getComments, clearComments};
