const httpStatus = require('http-status');
const UserModel = require('../models/user.model');
const ApiError = require('../utils/ApiError');

const UserService = {
  /**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
  createUser: async (userBody) => {
    if (await UserModel.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const user = await UserModel.create(userBody);
    return user;
  },

  /**
   * Query for users
   * @param {Object} filter - Mongo filter
   * @param {Object} options - Query options
   * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  queryUsers: async (filter, options) => {
    const users = await UserModel.paginate(filter, options);
    return users;
  },

  /**
   * Get user by id
   * @param {ObjectId} id
   * @returns {Promise<User>}
   */
  getUserById: async (id) => {
    return UserModel.findById(id);
  },

  /**
   * Get user by email
   * @param {string} email
   * @returns {Promise<User>}
   */
  getUserByEmail: async (email) => {
    return UserModel.findOne({ email });
  },

  /**
   * Update user by id
   * @param {ObjectId} userId
   * @param {Object} updateBody
   * @returns {Promise<User>}
   */
  updateUserById: async (userId, updateBody) => {
    const user = await UserService.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && (await UserModel.isEmailTaken(updateBody.email, userId))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
  },

  /**
   * Delete user by id
   * @param {ObjectId} userId
   * @returns {Promise<User>}
   */
  deleteUserById: async (userId) => {
    const user = await UserService.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.remove();
    return user;
  }
}


module.exports = UserService;
