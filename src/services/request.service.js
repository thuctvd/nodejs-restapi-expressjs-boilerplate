const http = require('http');
const URL = require('url');

function buildAuth(auth) {
  let authStr = '';
  if (auth.username && auth.password) {
    authStr = 'Basic ' + Buffer.from(auth.username + ':' + auth.password).toString('base64');
  }
  return authStr;
}

function buildQuery(params) {
  let query = '';
  if (params) {
    const queryList = [];
    for (const key in params) {
      queryList.push(`${key}=${params[key]}`);
    }
    if (queryList.length) {
      query = queryList.join('&');
    }
  }
  return query;
}

const RequestService = {
  post({ url, body = {}, params = {}, headers = {}, auth = { username: '', password: '' } }) {
    return new Promise((resolve, reject) => {
      let query = buildQuery(params);
      let authStr = buildAuth(auth);
      const reqUrl = URL.parse(url);
      const data = JSON.stringify(body);
      const options = {
        host: reqUrl.hostname,
        port: reqUrl.port,
        path: reqUrl.pathname,
        method: 'POST',
        query
      };
      const defaultHeader = {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      };
      if (authStr) {
        defaultHeader.Authorization = authStr;
      }
      options.headers = Object.assign(defaultHeader, headers);
      const req = http.request(options, res => {
        res.on('data', d => {
          try {
            console.log(`HTTP POST SUCCESS: ${url}, params: ${JSON.stringify(params)}, payload: ${data}.\n\tResponse:`, d.toString());
            resolve(JSON.parse(d));
          } catch (e) {
            resolve({});
          }
        })
      });

      req.on('error', error => {
        console.error(`HTTP POST ERROR: ${url}, params: ${JSON.stringify(params)}, payload: ${data}. Error:`, error);
        reject(error);
      });

      req.write(data);
      req.end();
    });
  },

  get({ url, params = {}, headers = {}, auth = { username: '', password: '' } }) {
    return new Promise((resolve, reject) => {
      let query = buildQuery(params);
      let authStr = buildAuth(auth);
      const reqUrl = URL.parse(url);
      const options = {
        host: reqUrl.hostname,
        port: reqUrl.port,
        path: reqUrl.pathname,
        method: 'GET',
        query
      };
      const defaultHeader = {
      };
      if (authStr) {
        defaultHeader.Authorization = authStr;
      }
      options.headers = Object.assign(defaultHeader, headers);
      const req = http.request(options, res => {
        res.on('data', d => {
          console.log(`HTTP GET SUCCESS: ${url}, params: ${JSON.stringify(params)}.\n\tResponse:`, d.toString());
          try {
            resolve(JSON.parse(d));
          } catch (e) {
            resolve({});
          }
        })
      });

      req.on('error', error => {
        console.error(`HTTP GET ERROR: ${url}, params: ${JSON.stringify(params)}. Error:`, error);
        reject(error);
      });

      req.end();
    });
  }
}

module.exports = RequestService;

