export {
  changeUserProfile, 
  addNewCard, 
  irrevDeleteCard, 
  currentUserData, 
  initialCards, 
  addCardLike,
  removeCardLike,
  changeUserAvatar,
  currentUserAvatar
 }

const config = {
  Url: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '31536b87-2f99-402f-bf92-fda5063b463d',
    'Content-Type': 'application/json',
  },
};

// Вывод текущего аватара на страницу

const currentUserAvatar = (avatarEdit) => {
  return fetch(`${config.Url}/users/me`, {
    method: 'GET',
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    `Ошибка ${res.status} при запросе данных`
  );
  })
}

// Смена аватара 

const changeUserAvatar = (avatarNewLink) => {
  return fetch(`${config.Url}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarNewLink.value,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Ошибка ${res.status} при изменении аватара`
    );
  })
}

//Cнятие лайка

const removeCardLike = (cardID) => {
  return fetch(`${config.Url}/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return 'Успешное удаление';
    }
    return Promise.reject(
      `Ошибка ${res.status} при снятии лайка`
    );
  });
}

//Постановка лайка

const addCardLike = (cardID) => {
  return fetch(`${config.Url}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Ошибка ${res.status} при постановке лайка`
    )
  })
}


// Загрузка карточек с сервера

const initialCards = () => {
  return fetch(`${config.Url}/cards`, {
    method: 'GET',
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Ошибка ${res.status} при загрузке карточек`
    );
  })
}

// Загрузка актуальных данных пользователя

const currentUserData = (profileName, profileJob) => {
  fetch(`${config.Url}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }})
    .then((result) => {
      profileName.textContent = result.name;
      profileJob.textContent = result.about;
    });
};

// Редактирование данных пользователя

const changeUserProfile = (nameInput, jobInput) => {
  fetch(`${config.Url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Ошибка ${res.status} при изменении данных пользователя`
    );
  });
};

// Добавление карточки на страницу

const addNewCard = (placeName, placeLink) => {
  return fetch(`${config.Url}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: placeName.value,
      link: placeLink.value,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Ошибка ${res.status} при добавлении на сервер`
    );
  });
};

// Удаление карточки

const irrevDeleteCard = (cardID) => {
  return fetch(`${config.Url}/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return 'Успешное удаление';
    }
    return Promise.reject(
      `Ошибка при удалении карточки с сервера. Ошибка ${res.status}`
    );
  });
}
