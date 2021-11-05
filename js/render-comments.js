const socialСommentsContainer = document.querySelector('.social__comments');
const bigPictureComment = socialСommentsContainer.querySelector('.social__comment');

const clearComments = () => {
  socialСommentsContainer.innerHTML = '';
};

const getComments = (comment) => {
  const bigPictureCommentFragment = bigPictureComment.cloneNode(true);

  const socialPicture = bigPictureCommentFragment.querySelector('.social__picture');
  const socialText = bigPictureCommentFragment.querySelector('.social__text');

  socialPicture.src = `${comment.avatar}`;
  socialPicture.alt = `${comment.name}`;
  socialText.textContent = `${comment.message}`;
  socialСommentsContainer.append(bigPictureCommentFragment);
};

export {getComments, clearComments};
