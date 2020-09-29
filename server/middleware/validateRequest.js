const { validationResult } = require('express-validator');

/**
 * @desc Global error handler for express validator middleware
 * @param {Array} validators - an array of 'express-validator/check' function validators
 */
module.exports = (validators) => {
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
