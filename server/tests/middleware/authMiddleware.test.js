const authMiddlewareFactory = require('../../middleware/authMiddleware');

describe('middleware/authMiddleware', () => {
  test('should return error if auth token header is not provided', () => {
    const authMiddleware = authMiddlewareFactory({});

    const req = {
      headers: {},
    };

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

    authMiddleware(req, res);

    expect(res.statusCode).toEqual(401);
    expect(res.errors[0].msg).toEqual(
      'No token provided, authorization denied!'
    );
  });

  test('should append encoded user data to request if token is valid', () => {
    const authMiddleware = authMiddlewareFactory({
      verifyJSONWebToken() {
        return {
          user: {
            id: '12345',
          },
        };
      },
    });

    const req = {
      headers: {
        'x-auth-token': 'token123',
      },
      user: null,
    };

    const next = () => {
      next.hasBeenCalled = true;
    };

    next.hasBeenCalled = false;

    authMiddleware(req, {}, next);

    expect(req.user.id).toEqual('12345');
    expect(next.hasBeenCalled).toBe(true);
  });
});
