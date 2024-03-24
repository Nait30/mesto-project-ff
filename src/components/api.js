import { profileTitle, profileDescription } from "./modal";

const profileImage = document.querySelector(".profile__image");

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-9",
  headers: {
    authorization: "c4d2648e-dfb3-42a0-897a-014712b8352e",
    "Content-Type": "application/json",
  },
};

function getCards(config) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getProfile(config) {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateProfile(profileData) {
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  updateAvatar(profileImage, profileData.avatar);
}

function updateAvatar(avatarElement, newAvatarUrl) {
  avatarElement.style.backgroundImage = `url(${newAvatarUrl})`;
}

function showProfileChanges(config, profileData) {
  getProfile(config).then((profileData) => {
    updateProfile(profileData);
  });
}

function submitProfileChanges(config, profileData) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(profileData),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

function submitAvatar(config, avatarData) {
  {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify(avatarData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function postCard(config, cardData) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(cardData),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteCard(config, cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

function putLike(config, cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteLike(config, cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export {
  getProfile,
  config,
  updateProfile,
  getCards,
  submitProfileChanges,
  showProfileChanges,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
  submitAvatar,
  updateAvatar,
};
