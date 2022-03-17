import axios from "axios";

// this http instance will be used through out
const http = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;

export const apiSignup = ({ cancelToken, payload }) => {
  return http.post("/users", payload, { cancelToken });
};

export const apiLogin = ({ cancelToken, payload }) => {
  return http.post("/sessions", payload, { cancelToken });
};
