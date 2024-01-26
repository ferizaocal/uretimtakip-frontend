import axios from 'axios';

import {store} from '../store';
export default function api() {
  const token = store.getState().auth.user?.token;
  if (token) {
    return axios.create({
      baseURL: 'http://localhost:8080/api/v1',
      headers:
        token != undefined
          ? {
              Authorization: `bearer ${token}`,
            }
          : {},
    });
  } else {
    return axios.create({
      baseURL: 'http://localhost:8080/api/v1',
    });
  }
}
