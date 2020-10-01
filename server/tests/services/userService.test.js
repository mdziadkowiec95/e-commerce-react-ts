const userServiceFactory = require('../../services/usersService');

describe('userService tests', () => {
  describe('userService/encryptPassword', () => {
    test('should encrypt password correctly', async () => {
      const bcrypt = {
        async genSalt(saltLength) {
          return Promise.resolve(saltLength);
        },
        async hashSync(password, salt) {
          return Promise.resolve(`${password}_${salt}`);
        },
      };
      const userService = userServiceFactory({ bcrypt });

      const encryptedPassword = await userService.encryptPassword('myPassword');

      expect(encryptedPassword).toEqual('myPassword_10');
    });
  });

  describe('userService/createJSONWebToken', () => {
    test('should pass payload to jwt sign method correctly', async () => {
      const jwt = {
        sign(payload) {
          return JSON.stringify(payload);
        },
      };
      const userService = userServiceFactory({ jwt });

      const token = userService.createJSONWebToken({
        user: {
          id: '12345',
        },
      });

      expect(token).toEqual(
        JSON.stringify({
          user: {
            id: '12345',
          },
        })
      );
    });
  });
});
