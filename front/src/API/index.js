import request from 'request';

const host = 'http://localhost:8000';

export const getPosts = (callback) => {
  const url = `${host}/blog/posts/`;
  request.get(url, (error, response, body) => {
    if (error) {
      console.log('ERROR', error);
    }

    console.log('response', response);
    console.log('body', body);
  });
};
