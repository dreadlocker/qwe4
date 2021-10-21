import axios from "axios";

// for local test
export const baseURL = axios.defaults.baseURL = 'http://localhost:3000';
// // FOR PRODUCTION
// const baseURL = axios.defaults.baseURL = 'https://dreadlocker.github.io/qwe4';

export const BASE_API_URL = `${baseURL}/api/`
export const configUrlEncoded = {
  headers: { "content-type": "application/x-www-form-urlencoded" },
}
export const configFormData = {
  headers: { "content-type": "multipart/form-data" },
}

axios.defaults.headers.get['Access-Control-Allow-Origin'] = baseURL;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = baseURL;
axios.defaults.headers.put['Access-Control-Allow-Origin'] = baseURL;
axios.defaults.headers.delete['Access-Control-Allow-Origin'] = baseURL;
