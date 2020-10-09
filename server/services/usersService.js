module.exports = ({ UserModel, bcrypt, jwt }) => ({
  /**
   * Enrypt user password
   * @param {string} password not encrypted password
   * @return {string} enrypted password
   */
  async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hashSync(password, salt);
  },
  /**
   * Compare user passowrd with enrypted passowrd from DB
   * @param {string} password not encrypted password
   * @param {string} hashedPassword encrypted password
   * @return {boolean}
   */
  async comparePasswords(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  },
  /**
   * Generate JWT for given payload
   * @param {Object} payload data which will be changed to JWT
   * @return {string} JWT string
   */
  createJSONWebToken(payload) {
    return jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
      expiresIn: 12 * 3600,
    });
  },
  /**
   * Verify if provided JWT is vaild
   * @param {string} token
   * @return {any} - decoded JWT
   */
  verifyJSONWebToken(token) {
    return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  },
});
