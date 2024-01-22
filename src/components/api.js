export {
  changeUserProfile,
  addNewCard,
  irrevDeleteCard,
  currentUserData,
  getInitialCards,
  addCardLike,
  removeCardLike,
  changeUserAvatar,
};

const config = {
  Url: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "31536b87-2f99-402f-bf92-fda5063b463d",
    "Content-Type": "application/json",
  },
};

// Смена аватара

const changeUserAvatar = (avatar) => {
  return fetch(`${config.Url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(handleResponse);
};

//Cнятие лайка

const removeCardLike = (cardID) => {
  return fetch(`${config.Url}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

//Постановка лайка

const addCardLike = (cardID) => {
  return fetch(`${config.Url}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
};

// Загрузка карточек с сервера

const getInitialCards = () => {
  return fetch(`${config.Url}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);
};

// Загрузка актуальных данных пользователя

const currentUserData = () => {
  return fetch(`${config.Url}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);
};

// Редактирование данных пользователя

const changeUserProfile = (name, job) => {
  return fetch(`${config.Url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  })
    .then(handleResponse)
    .catch((err) => {
      console.log(err);
    });
};

// Добавление карточки на страницу

const addNewCard = (name, link) => {
  return fetch(`${config.Url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(handleResponse);
};

// Удаление карточки

const irrevDeleteCard = (cardID) => {
  return fetch(`${config.Url}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

// Обработчик ошибок

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};
