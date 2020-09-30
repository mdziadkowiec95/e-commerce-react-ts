const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check } = require('express-validator');
const { validateRequest } = require('../../middleware/validateRequest');
const UserModel = require('../../models/UserModel');
const usersService = require('../../services/usersService')({
  UserModel,
  bcrypt,
  jwt,
});
const UsersController = require('../../controllers/usersController')({
  usersService,
  UserModel,
});

/**
 * @route POST api/users/register
 * @desc Register user and get JWT
 * @access Public
 */
router.post(
  '/register',
  [
    ...validateRequest([
      check('email', 'Email is invalid').isEmail(),
      check('password')
        .isLength({ min: 8 })
        .withMessage('Password should be at least 8 characters long.'),
      check('passwordConfirm')
        .isLength({ min: 8 })
        .withMessage('Confirmed password should be at least 8 characters long.')
        .custom(
          (passwordConfirm, { req }) => passwordConfirm === req.body.password
        )
        .withMessage('Passwords must be the same.'),
      check('firstName').notEmpty().withMessage('First name is required.'),
      check('lastName').notEmpty().withMessage('Last name is required.'),
    ]),
  ],
  UsersController.register
);

module.exports = router;
