// // Модуль для получения и отправки данных на удалённый сервер
const DATA_URL = 'https://24.javascript.pages.academy/kekstagram/data';
const SERVER_URL = 'https://24.javascript.pages.academy/kekstagram';

const getServerData = (onSuccess, onError) => {
  fetch(DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch((err) => {
      onError(err);
    });
};

const sendServerData = (onSuccess, messageOnSuccess, messageOnFail, body) => {
  fetch(
    SERVER_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        messageOnSuccess();
      } else {
        messageOnFail();
      }
    })
    .catch(() => {
      messageOnFail();
    });
};

export {SERVER_URL, getServerData, sendServerData};
