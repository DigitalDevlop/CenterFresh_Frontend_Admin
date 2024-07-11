import { jwtDecode } from "jwt-decode";

const localStorageName = "usercfadmin326542#425"

const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem(localStorageName));
  return user?.refreshToken;
};

const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem(localStorageName));
  return user?.accessToken;
};

const updateLocalAccessToken = (token) => {
  let user = JSON.parse(localStorage.getItem(localStorageName));
  user.accessToken = token;
  localStorage.setItem(localStorageName, JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem(localStorageName));
};

const getUsername = () => {
  return JSON.parse(localStorage.getItem(localStorageName))?.user?.username;
};



const setUser = (user) => {
  localStorage.setItem(localStorageName, JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem(localStorageName);
};

const getToken = () => {
  return JSON.parse(localStorage.getItem(localStorageName))?.jwt || JSON.parse(localStorage.getItem(localStorageName))?.token;
}

const getTokenDetails = () => {
  const details = jwtDecode(JSON.parse(localStorage.getItem(localStorageName))?.jwt)
  return details;
}

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
  getUsername,
  getToken,
  getTokenDetails
};

export default TokenService;
