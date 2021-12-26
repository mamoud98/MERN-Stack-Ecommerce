import axios from "axios";
import { API } from "../config";
import queryString from "query-string";

export const getProducts = (sortBy) => {
  return axios.get(`${API}/product?sortBy=${sortBy}&order=desc&limit=6`);
};

export const read = (productId) => {
  return axios.get(`${API}/product/${productId}`);
};
export const listRelated = (productId) => {
  return axios.get(`${API}/product/category/${productId}`);
};
export const list = (params) => {
  const query = queryString.stringify(params);
  return axios.get(`${API}/products/search?${query}`);
};
export const getCategories = () => {
  return axios.get(`${API}/category`);
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    skip,
    limit,
    filters,
  };

  return axios.post(`${API}/products/filter`, data);
};
export const getBraintreeClientToken = (token) => {
  return axios.get(`${API}/braintree/getToken`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const processPayment = (token, data) => {
  return axios.post(`${API}/braintree/processPayment`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const createOrder = (token, order) => {
  const data = {
    order,
  };
  return axios.post(`${API}/order/create`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
