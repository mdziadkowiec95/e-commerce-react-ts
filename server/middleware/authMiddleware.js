const authMiddleware = (usersService) => (req, res, next) => {
  const token = req.headers['x-auth-token'];

  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: 'No token provided, authorization denied!' }] });
  }

  try {
    const decodedJwt = usersService.verifyJSONWebToken(token);

    req.user = decodedJwt.user;

    next();
  } catch (error) {
    console.error(error);

    res.status(401).json({ errors: [{ msg: 'Token is not valid!' }] });
  }
};

module.exports = authMiddleware;
