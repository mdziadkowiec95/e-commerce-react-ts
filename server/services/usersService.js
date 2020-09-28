module.exports = ({ userRepository, bcrypt, jwt }) => ({
  async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hashSync(password, salt);
  },
  createJSONWebToken(payload) {
    return jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
      expiresIn: 12 * 3600,
    });
  },
});
