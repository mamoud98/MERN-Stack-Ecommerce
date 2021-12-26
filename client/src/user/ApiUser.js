import axios from "axios";
import { locale } from "moment";
import { API } from "../config";

export const read = (token, userId) => {
  return axios.get(`${API}/user/${userId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const updateUser = (user, next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      const auth = JSON.parse(localStorage.getItem("jwt"));
      auth.user = user;
      localStorage.setItem("jwt", JSON.stringify(auth));
      next();
    }
  }
};

export const update = (token, userId, data) => {
  return axios.put(`${API}/user/${userId}`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getPurchaseHistory = (token) => {
  return axios.get(`${API}/order/by/user`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
