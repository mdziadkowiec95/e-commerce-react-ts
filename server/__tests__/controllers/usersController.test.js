const usersControllerFactory = require('../../controllers/usersController');

describe('usersController tests', () => {
  describe('usersController/register', () => {
    test('should return error if user already exist', async () => {
      const UserModel = {
        findOne({ email }) {
          return { _id: '12345', email };
        },
      };
      const usersController = usersControllerFactory({ UserModel });

      const req = {
        body: {
          email: 'test@test.pl',
        },
      };

      const res = {
        statusCode: 500,
        errors: null,
        status: function (code) {
          res.statusCode = code;
          return res;
        },
        json: function (data) {
          res.errors = data.errors;
        },
      };
      await usersController.register(req, res);

      expect(res.errors[0].msg).toEqual('User with this email already exists!');
      expect(res.statusCode).toEqual(400);
    });

    test('should return JWT (token) if user is registered successfully', async () => {
      function UserModel(userData) {
        return {
          ...userData,
          _id: '777',
          save: () => {},
        };
      }

      UserModel.findOne = () => null;

      const usersService = {
        encryptPassword: (password) => `${password}_is_encrypted`,
        createJSONWebToken: (payload) => `${payload.user.id}_jwt_generated`,
      };
      const usersController = usersControllerFactory({
        UserModel,
        usersService,
      });

      const req = {
        body: {},
      };

      const res = {
        statusCode: 500,
        token: null,
        status: function (code) {
          res.statusCode = code;
          return res;
        },
        send: () => {},
        json: function (data) {
          res.token = data.token;
        },
      };
      await usersController.register(req, res);

      expect(res.token).toEqual('777_jwt_generated');
      expect(res.statusCode).toEqual(201);
    });

    test('should return catch internal server error correctly', async () => {
      const UserModel = {
        findOne() {
          throw new Error('Some unexpected error!');
        },
      };
      const usersController = usersControllerFactory({ UserModel });

      const req = {
        body: {},
      };

      const res = {
        statusCode: 200,
        errorMsg: null,
        status: function (code) {
          res.statusCode = code;
          return res;
        },
        send(msg) {
          res.errorMsg = msg;
        },
      };
      await usersController.register(req, res);

      expect(res.errorMsg).toEqual('Internal server error!');
      expect(res.statusCode).toEqual(500);
    });
  });
});
