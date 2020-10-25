const mongoose = require('mongoose');
const app = require('./src/app');
const config = require('./src/config/config');

let server;

//Connect DB
const crawlerDB = {
  uri: config.DB_CONNECTION.crawler.uri,
  options: config.DB_CONNECTION.crawler.options,
};
mongoose.connect(crawlerDB.uri, crawlerDB.options).then(() => {
  console.log(`***** Connected to MongoDB At: ${crawlerDB.uri} *****`);
  server = app.listen(config.PORT, () => {
    console.log(`***** Listening to port [${config.PORT}] *****`);
  });
});

const unexpectedErrorHandler = (error) => {
  console.error(error);
};
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

// setInterval(() => {
//   showMemoryUsage();
// }, 10000);

function showMemoryUsage() {
  const memoryUsage = process.memoryUsage();
  const rss = Math.floor(memoryUsage.rss / 1024 / 1024);
  const heapUsed = Math.floor(memoryUsage.heapUsed / 1024 / 1024);
  const heapTotal = Math.floor(memoryUsage.heapTotal / 1024 / 1024);
  console.log(`memory report: rss:${rss}Mb - heapUsed:${heapUsed}Mb - heapTotal: ${heapTotal}Mb`);
};