import axios from "axios";
import { API } from "../config";

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    axios
      .get(`${API}/logout`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  }
  return false;
};

export const signup = (name, email, password) => {
  return axios.post(`${API}/signup`, {
    name,
    email,
    password,
  });
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};
export const signin = (email, password) => {
  return axios.post(`${API}/login`, {
    email,
    password,
  });
};
