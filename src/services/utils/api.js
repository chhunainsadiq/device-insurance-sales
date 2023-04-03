import axios from "axios";

export const httpClient = () => {
  return axios.create({
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json",
    },
  });
};

export const fetch = (url, params = {}) =>
  httpClient().get(url, { params });

export const create = (url, data) =>
  httpClient().post(url, data);  
