import axios from 'axios';

axios.interceptors.request.use(config => {
  const jwt = localStorage.getItem('jwt-token');

  if (jwt && (!config.headers || !config.headers['Authorization'])) {
    config.headers['Authorization'] = 'Bearer ' + jwt;
  }

  return config;
});

export const callApi = (url, method, data) => {
  return axios({
    url,
    method,
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const formSubmit = (url, data) => {
  return axios({
    url,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
