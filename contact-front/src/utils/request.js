import axios from "axios";

export const callApi = (url, method, data, token) => {
  return axios({
    url,
    method,
    data,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  });
};

export const formSubmit = (url, data, token) => {
  return axios({
    url,
    method: "POST",
    data,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  });
};
