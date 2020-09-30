const { validationResult } = require('express-validator');

function wrapWithTryCatch(fn) {
  return async function (req, res, next) {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function withErrorHandling(api) {
  return mapValues(api, wrapWithTryCatch);
}

module.exports = ({ usersService, UserModel }) => {
  return {
    async register(req, res) {
      try {
        const { email, password, firstName, lastName } = req.body;
        let user = await UserModel.findOne({ email });

        if (user) {
          return res.status(400).json({
            errors: [{ msg: 'User with this email already exists!' }],
          });
        }

        const encryptedPassword = await usersService.encryptPassword(password);

        user = new UserModel({
          email,
          password: encryptedPassword,
          firstName,
          lastName,
        });

        await user.save();

        // TODO -> Create and save email verificaiton token

        // TODO -> Send activation email

        const jwtPayload = {
          user: {
            id: user._id,
          },
        };

        const token = usersService.createJSONWebToken(jwtPayload);

        res.status(201).json({ token });
      } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error!');
      }
    },
  };
};
