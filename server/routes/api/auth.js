const router = require('express').Router();
const { check } = require('express-validator');
const UserModel = require('../../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersService = require('../../services/usersService')({ bcrypt, jwt });
const AuthController = require('../../controllers/authController')({
  UserModel,
  usersService,
});
const { validateRequest } = require('../../middleware/validateRequest');
const authMiddleware = require('../../middleware/authMiddleware')(usersService);

/**
 * @route GET api/auth
 * @desc Authenticate user
 * @access Private
 */
router.get('/', authMiddleware, AuthController.authenticate);

/**
 * @route GET api/auth/signin
 * @desc Sing in user
 * @access Public
 */
router.post(
  '/signin',
  [
    ...validateRequest([
      check('email').isEmail().withMessage('Please, enter correct email!'),
      check('password')
        .isLength({ min: 8 })
        .withMessage('Password should be at least 8 characters long.'),
    ]),
  ],
  AuthController.signIn
);

module.exports = router;
