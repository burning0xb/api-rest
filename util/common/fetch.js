import fetch from 'node-fetch';
import { json2form, json2param } from '../common';

export function jsonPost(url, jsonBody, headers) {
  const _headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  if (headers) {
    for (let prop in headers) {
      _headers[prop] = headers[prop];
    }
  }
  return fetch(url, {
    method: 'POST',
    headers: _headers,
    body: JSON.stringify(jsonBody)
  }).then((res) => {
    return res.json();
  })
}

export function formPost(url, jsonBody) {
  const form = json2form(jsonBody);
  return fetch(url, {
    method: 'POST',
    headers: form.getHeaders(),
    body: form
  }).then((res) => {
    return res.json();
  }).catch((err) => {
    console.log(err);
  });
}

export function paramGet(url, jsonBody, headers) {
  if (jsonBody) {
    url += '?' + json2param(jsonBody);
  }
  const param = {
      method: 'GET'
  };
  if (headers) {
    param.headers = headers;
  }
  return fetch(url, param).then((res) => {
    return res.json();
  })
}
