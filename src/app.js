const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const { jwtStrategy } = require('./config/passport');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const CrawlerManager = require('./managers/crawler.manager');
const logRequest = require('./middlewares/logRequest');
const setVariables = require('./middlewares/setvariables');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(mongoSanitize());
app.use(compression());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());
app.options('*', cors());
app.use(logRequest);
app.use(setVariables);

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/', routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
app.use(errorConverter);
app.use(errorHandler);

app.crawlerManager = new CrawlerManager(this);

module.exports = app;
