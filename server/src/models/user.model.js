const { prisma } = require("../config/database");

class UserModel {
  /**
   * Creates a new user in the database.
   * @param {object} userData - The user data.
   * @param {string} userData.email - The user's email.
   * @param {string} userData.password - The user's hashed password.
   * @param {string} userData.name - The user's name.
   * @returns {Promise<User>} The created user.
   */
  async createUser({ email, password, name }) {
    return prisma.user.create({
      data: { email, password, name },
    });
  }

  async findUserByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Finds a user by their ID.
   * @param {string} id - The user's ID.
   * @returns {Promise<User|null>} The found user or null.
   */
  async findUserById(id) {
    return prisma.user.findUnique({ where: { id } });
  }
}

module.exports = new UserModel();
