module.exports = ({ usersService, UserModel }) => {
  return {
    async signIn(req, res) {
      const { email, password } = req.body;

      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return res.status(404).json({ errors: [{ msg: 'User not found!' }] });
        }

        const passwordMatch = await usersService.comparePasswords(
          password,
          user.password
        );

        if (!passwordMatch) {
          return res.status(400).json({
            errors: [{ msg: 'Please, enter correct credientials!' }],
          });
        }

        if (!user.isVerified) {
          return res.status(401).json({
            errors: [
              {
                msg:
                  'Your account has not been verified. Please check your email and verify your email!',
              },
            ],
          });
        }

        const jwtPayload = {
          user: {
            id: user.id,
          },
        };

        const token = usersService.createJSONWebToken(jwtPayload);

        res.json({ token });
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error!');
      }
    },
    async authenticate(req, res) {
      try {
        const user = await UserModel.findById(req.user.id).select('-password');

        res.json(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error!');
      }
    },
  };
};
