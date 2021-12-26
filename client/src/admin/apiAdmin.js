import axios from "axios";
import { API } from "../config";

export const createCategory = (token, name) => {
  return axios.post(
    `${API}/category`,
    {
      name,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getCategories = () => {
  return axios.get(`${API}/category`);
};

export const createProduct = (token, data) => {
  return axios.post(
    `${API}/product`,

    data,

    {
      headers: {
        authorization: `Bearer ${token}`,
        ContentType: "multipart/form-data",
      },
    }
  );
};
export const getCategory = (token, CategoryId) => {
  return axios.get(`${API}/category/${CategoryId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const updateCategory = (token, CategoryId, data) => {
  return axios.put(
    `${API}/category/${CategoryId}`,

    data,

    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getProducts = (limit = 6) => {
  return axios.get(`${API}/product?order=desc&limit=${limit}`);
};

export const deleteProduct = (token, productId) => {
  return axios.delete(`${API}/product/${productId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const updateProduct = (token, data, productId) => {
  return axios.put(
    `${API}/product/${productId}`,

    data,

    {
      headers: {
        authorization: `Bearer ${token}`,
        ContentType: "multipart/form-data",
      },
    }
  );
};

export const getProduct = (productId) => {
  return axios.get(`${API}/product/${productId}`);
};

export const deleteCategory = (token, CategoryId) => {
  return axios.delete(`${API}/category/${CategoryId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const listOrders = (token) => {
  return axios.get(`${API}/order/list`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const updateOrderStatus = (token, status, orderId) => {
  
  return axios.put(`${API}/order/status/${orderId}`, {status}, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const getStatusValues = (token) => {
  return axios.get(`${API}/order/status-values`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
