import request from 'request';

const isLocal = window.location.origin.startsWith('http://localhost');
const host = isLocal ? 'http://localhost:8000' : window.location.origin;
export const mediaHost = isLocal ? host : '';
const r = request.defaults({ json: true });

const getRequest = (url, callback) => {
  r.get(url, (error, response, body) => callback(error, body));
};

const postRequest = (url, body, callback) => {
  r.post({url, body}, ((error, response, body) => callback(error, body)));
};

export const getPosts = (page, callback) => {
  getRequest(`${host}/blog/posts/?page=${page}`, callback);
};

export const getPost = (id, callback) => {
  getRequest(`${host}/blog/post/?id=${id}`, callback);
};

export const comment = (body, callback) => {
  postRequest(`${host}/blog/comment/`, body, callback);
};
