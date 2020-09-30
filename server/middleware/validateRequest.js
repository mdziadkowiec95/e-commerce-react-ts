const { validationResult } = require('express-validator');

/**
 * @desc Global error handler for express validator middleware
 * @param {Function} validationResult - express-validator dependency used for validation
 * @param {Array} validators - an array of 'express-validator/check' function validators
 */
const validateRequestFactory = (validationResult) => (validators) => {
  return [
    validators,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      next();
    },
  ];
};
module.exports = {
  validateRequestFactory,
  validateRequest: validateRequestFactory(validationResult),
};
