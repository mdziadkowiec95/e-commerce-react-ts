const { validateRequestFactory } = require('../../middleware/validateRequest');

describe('middleware/validateRequest tests', () => {
  test('should return errors correctly when any occurs', () => {
    const validateRequest = validateRequestFactory(() => {
      return {
        isEmpty() {
          return false;
        },
        array() {
          return [{ msg: 'Passwords must be the same' }];
        },
      };
    });

    const req = {};
    const res = {
      statusCode: 500,
      errors: null,
      status(code) {
        res.statusCode = code;
        return res;
      },
      json(data) {
        res.errors = data.errors;
      },
    };

    const mockCheckFunctions = [() => {}, () => {}];
    // Last item in the returned array should be the final validator function which is returning errors
    const validatorFn = validateRequest(mockCheckFunctions)[
      mockCheckFunctions.length - 1
    ];

    validatorFn(req, res);

    expect(res.errors[0].msg).toEqual('Passwords must be the same');
    expect(res.statusCode).toEqual(400);
  });

  test('should call next() function if no errors occured', () => {
    const validateRequest = validateRequestFactory(() => {
      return {
        isEmpty() {
          return true;
        },
      };
    });

    const req = {};
    const res = {};
    const next = () => {
      next.hasBeenCalled = true;
    };

    next.hasBeenCalled = false;

    const mockCheckFunctions = [() => {}, () => {}];
    // Last item in the returned array should be the final validator function which is returning errors
    const validatorFn = validateRequest(mockCheckFunctions)[
      mockCheckFunctions.length - 1
    ];

    validatorFn(req, res, next);

    expect(next.hasBeenCalled).toBe(true);
  });
});
