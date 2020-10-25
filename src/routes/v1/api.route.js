const express = require('express');
const apiController = require('../../controllers/api.controller');

const router = express.Router();

router.get('/get_member_info', apiController.getMemberInfo);
router.post('/test1', apiController.needToDo);
router.post('/test2', apiController.needToDo);

module.exports = router;