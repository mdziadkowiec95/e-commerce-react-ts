const authControllerFactory = require('../../controllers/authController');
const createMockResponseObject = require('../helpers/createMockResponseObject');

describe('controllers/authController', () => {
  describe('signIn', () => {
    test('should return error if user is not found', async () => {
      const UserModel = {
        findOne: () => null,
      };
      const authController = authControllerFactory({ UserModel });

      const req = { body: {} };
      const res = createMockResponseObject();

      await authController.signIn(req, res);

      expect(res.errors[0].msg).toEqual('User not found!');
      expect(res.statusCode).toEqual(404);
    });

    test(`should return proper error if user password don't match`, async () => {
      const UserModel = {
        findOne: () => ({}),
      };

      const usersService = {
        async comparePasswords() {
          return false;
        },
      };
      const authController = authControllerFactory({ UserModel, usersService });

      const req = { body: {} };
      const res = createMockResponseObject();

      await authController.signIn(req, res);

      expect(res.errors[0].msg).toEqual('Please, enter correct credientials!');
      expect(res.statusCode).toEqual(400);
    });

    test(`should return proper error if user is not verified yet`, async () => {
      const UserModel = {
        findOne: () => ({
          isVerified: false,
        }),
      };

      const usersService = {
        comparePasswords: async () => true,
      };
      const authController = authControllerFactory({ UserModel, usersService });

      const req = { body: {} };
      const res = createMockResponseObject();

      await authController.signIn(req, res);

      expect(res.errors[0].msg).toEqual(
        'Your account has not been verified. Please check your email and verify your email!'
      );
      expect(res.statusCode).toEqual(401);
    });

    test(`should return auth token if user has been signed in successfully`, async () => {
      const UserModel = {
        findOne: () => ({
          id: '12345',
          isVerified: true,
        }),
      };

      const usersService = {
        comparePasswords: async () => true,
        createJSONWebToken: (payload) => `token_${payload.user.id}`,
      };
      const authController = authControllerFactory({ UserModel, usersService });

      const req = { body: {} };
      const res = createMockResponseObject((data) => {
        res.token = data.token;
      });

      await authController.signIn(req, res);

      expect(res.token).toEqual('token_12345');
    });
  });

  describe('authenticate', () => {
    test('should query DB using user.id from request object', async () => {
      const UserModel = {
        passedId: null,
        findById: (id) => {
          UserModel.passedId = id;
          return UserModel;
        },
        select() {},
      };

      const authController = authControllerFactory({ UserModel });
      const req = {
        user: {
          id: '12345',
        },
      };
      const res = createMockResponseObject(() => {});

      await authController.authenticate(req, res);

      expect(UserModel.passedId).toEqual('12345');
    });

    test('should query DB for user exluding password property', async () => {
      const UserModel = {
        selectQuery: null,
        findById: () => {
          return UserModel;
        },
        select(query) {
          UserModel.selectQuery = query;
        },
      };

      const authController = authControllerFactory({ UserModel });
      const req = {
        user: {
          id: '12345',
        },
      };
      const res = createMockResponseObject(() => {});

      await authController.authenticate(req, res);

      expect(UserModel.selectQuery).toEqual('-password');
    });

    test('should return authenticated user properly', async () => {
      const UserModel = {
        user: null,
        findById: (id) => {
          UserModel.user = {
            _id: id,
            firstName: 'Mikel',
          };
          return UserModel;
        },
        select() {
          return UserModel.user;
        },
      };

      const authController = authControllerFactory({ UserModel });
      const req = {
        user: {
          id: '123',
        },
      };
      const res = createMockResponseObject((data) => {
        res.user = data;
      });

      await authController.authenticate(req, res);

      expect(res.user._id).toEqual('123');
      expect(res.user.firstName).toEqual('Mikel');
    });
  });
});
