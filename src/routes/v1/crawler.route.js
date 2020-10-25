const express = require('express');
const validate = require('../../middlewares/validate');
const crawlerValidation = require('../../validations/crawler.validation');
const crawlerController = require('../../controllers/crawler.controller');

const router = express.Router();

router.get('/', validate(crawlerValidation.index), crawlerController.index);

module.exports = router;