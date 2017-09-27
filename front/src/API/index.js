import request from 'request';

const host = 'http://localhost:8000';
const r = request.defaults({ json: true });

export const getPosts = (page, callback) => {
  const url = `${host}/blog/posts/?page=${page}`;
  r.get(url, (error, response, body) => callback(error, body));
};
