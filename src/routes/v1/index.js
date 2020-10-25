const express = require('express');
const fs = require('fs');
const path = require('path');

// auto map route files
const router = express.Router();
const routeFiles = fs.readdirSync(path.join(__dirname, './'));
for (let i = 0; i < routeFiles.length; i++) {
  const fileName = routeFiles[i];
  if (fileName.indexOf('index.js') >= 0)
    continue;  
  const arr = fileName.split('.');
  if(arr.length != 3) {
    console.log(`----ERROR: Has a file with invalid named: ${fileName} --- Please Fix!!!!`);
    continue;
  }
  
  const routePath = `/${arr[0]}`;
  const routeHanlder = require(`./${arr[0]}.${arr[1]}`);
  router.use(routePath, routeHanlder);
}

router.use('/test', (req, res, next) => {
  req.crawlerManager.getListNode();
  res.json({ success: true });
});

module.exports = router;
