import axios from 'axios';
import path from 'ramda/src/path';

const baseURL = process.env.REACT_APP_BASE_HOST;

export const instance = axios.create({
  baseURL,
});

export function serializeParams (params) {
  // 스트링 변환 후 첫번째 &를 삭제
  const qs = Object.entries(params)
    .reduce((acc, e) => `${acc}&${e[0]}=${e[1]}`, '')
    .slice(1);
  return `?${qs}`;
}

export function apiGet (url, params, options = {}) {
  let u = url;

  if (params) {
    u = `${url}${serializeParams(params)}`;
  }

  return callApi(() => instance.get(u, options));
}

export function apiPost (url, params, options = {}) {
  return callApi(() => instance.post(url, params, options));
}

export function apiPut (url, params, options = {}) {
  return callApi(() => instance.put(url, params, options));
}

export function apiDelete (url, options = {}) {
  return callApi(() => instance.delete(url, options));
}

export function apiPatch (url, params, options = {}) {
  return callApi(() => instance.patch(url, params, options));
}

async function callApi (api) {
  try {
    const r = await api();

    return Promise.resolve(r.data);
  } catch (e) {
    const data = path(['response', 'data'])(e);
    return Promise.reject(data);
  }
}