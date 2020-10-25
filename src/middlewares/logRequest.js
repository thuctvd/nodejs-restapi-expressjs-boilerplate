const moment = require('moment');

function printLog (req, resData) {
  console.log({
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    time: moment().format('DD/MM/YYYY HH:mm:ss'),
    method: req.method,
    url: req.url,
    dataRequest: JSON.stringify(req.body),
    dataResponse: JSON.stringify(resData)
  });
}

//override res.json method to log full request/response at same time
const logRequest = (req, res, next) => {
  let originalFunc = res.json;

  res.json = function(){
    printLog(req, arguments[0]);
    originalFunc.apply(res, arguments);
  };
  next();
}

module.exports = logRequest;