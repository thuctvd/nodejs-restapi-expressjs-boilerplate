const { CODE, MESSAGE } = require('../constants/global.constant');
const ApiService = require('../services/api.service');


const getMemberInfo = async (req, res) => {
  const data = await ApiService.getMemberInfo({});
  res.json({ code: CODE.SUCCESS, message: MESSAGE.SUCCESS, data });
}

const needToDo = async (req, res) => {
  res.json({ code: CODE.SUCCESS, message: 'this function need to do', data:{} })
}

module.exports = {
  needToDo,
  getMemberInfo
}