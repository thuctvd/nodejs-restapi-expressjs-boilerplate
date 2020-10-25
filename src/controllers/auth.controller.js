const httpStatus = require('http-status');
const AuthService = require('../services/auth.service');
const TokenService = require('../services/token.service');
const UserService = require('../services/user.service');
const catchAsync = require('../utils/catchAsync');


const register = catchAsync(async (req, res) => {
  const user = await UserService.createUser(req.body);
  const tokens = await TokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserService.loginUserWithEmailAndPassword(email, password);
  const tokens = await TokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await AuthService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await AuthService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens
};
