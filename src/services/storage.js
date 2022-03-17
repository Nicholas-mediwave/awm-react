export const storageSetAccessToken = (token) => {
  localStorage.setItem("awm_react__accessToken", token);
};

export const storageClearAccessToken = () => {
  localStorage.removeItem("awm_react__accessToken");
};

export const storageGetAccessToken = () => {
  return localStorage.getItem("awm_react__accessToken");
};
