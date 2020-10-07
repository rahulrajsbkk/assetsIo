/* eslint-disable import/prefer-default-export */

export const setAppLoginData = (
  tokenAppToken,
  tokenAppAccessToken,
  tokenAppLoginAccount
) => {
  localStorage.setItem("tokenAppToken", tokenAppToken);
  localStorage.setItem("tokenAppAccessToken", tokenAppAccessToken);
  localStorage.setItem("tokenAppLoginAccount", tokenAppLoginAccount);
};

export const getAppToken = () => {
  return localStorage.getItem("tokenAppToken");
};

export const getAppEmail = () => {
  return localStorage.getItem("tokenAppLoginAccount");
};

export const getToken = () => {
  return localStorage.getItem("tokenAppToken");
};