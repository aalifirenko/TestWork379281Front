import axios from 'axios';

const base_api_url = 'http://teachers.local/api';

const api = axios.create({
  baseURL: base_api_url,
  validateStatus: () => true,
  timeout: 10000,
});

api.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'

  if (
    localStorage.getItem("userInfo") != null &&
    localStorage.getItem("userInfo").length > 0
  ) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    config.headers['token'] = userInfo;
  }
  return config;
}, error => {
  return Promise.reject(error)
});

api.interceptors.response.use(response => {
  console.log('interceptors response', response);
  if (response.status === 401 && response.data.message === 'Unauthenticated.') {
    localStorage.removeItem('userInfo');
    window.location.reload();
  } else if (response.status === 404) {
    window.location.href = window.location.origin + '/app/error';
  }
  return response
});

export default api;
