const { validationResult } = require('express-validator');

module.exports = ({ usersService, usersRepository }) => {
  return {
    async register(req, res) {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
          });
        }

        const { email, password, firstName, lastName } = req.body;
        let user = await usersRepository.findOne(email);

        if (user) {
          return res.status(400).json({
            errors: [{ msg: 'User with this email already exists!' }],
          });
        }

        const encryptedPassword = await usersService.encryptPassword(password);

        const insertedUser = await usersRepository.insertOne({
          email,
          password: encryptedPassword,
          firstName,
          lastName,
          isVerified: false,
        });

        // TODO -> Create and save email verificaiton token

        // TODO -> Send activation email

        const jwtPayload = {
          user: {
            id: insertedUser.ops[0]._id,
          },
        };

        const token = usersService.createJSONWebToken(jwtPayload);

        res.json({ token });
      } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error!');
      }
    },
  };
};
