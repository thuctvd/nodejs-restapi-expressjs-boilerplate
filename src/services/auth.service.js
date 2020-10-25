const httpStatus = require('http-status');
const TokenService = require('./token.service');
const UserService = require('./user.service');
const TokenModel = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

const AuthService = {
  /**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
  loginUserWithEmailAndPassword: async (email, password) => {
    const user = await UserService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
  },

  /**
   * Logout
   * @param {string} refreshToken
   * @returns {Promise}
   */
  logout: async (refreshToken) => {
    const refreshTokenDoc = await TokenModel.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
    if (!refreshTokenDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    }
    await refreshTokenDoc.remove();
  },

  /**
   * Refresh auth tokens
   * @param {string} refreshToken
   * @returns {Promise<Object>}
   */
  refreshAuth: async (refreshToken) => {
    try {
      const refreshTokenDoc = await TokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
      const user = await UserService.getUserById(refreshTokenDoc.user);
      if (!user) {
        throw new Error();
      }
      await refreshTokenDoc.remove();
      return TokenService.generateAuthTokens(user);
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
  },

  /**
   * Reset password
   * @param {string} resetPasswordToken
   * @param {string} newPassword
   * @returns {Promise}
   */
  resetPassword: async (resetPasswordToken, newPassword) => {
    try {
      const resetPasswordTokenDoc = await TokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
      const user = await UserService.getUserById(resetPasswordTokenDoc.user);
      if (!user) {
        throw new Error();
      }
      await TokenModel.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
      await UserService.updateUserById(user.id, { password: newPassword });
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
    }
  }
}

module.exports = AuthService;