
import * as request from 'superagent';

export const BASE_URL = `${process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_DEV_API
    : process.env.REACT_APP_LIVE_API
  }`;

const apiFullCall = (data, type, url) => {
  //eg, BASE_URL=http://127.0.0.1:8000/api
  
  return new Promise((resolve, reject) => {
    request[type](`${BASE_URL}/${url}`)
      .send(data)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (res) {
          return resolve(res);
        }
        return reject(err);
      });
  });
};

export { apiFullCall };