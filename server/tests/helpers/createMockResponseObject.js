module.exports = (jsonCallback, initialStatusCode = 500) => {
  const res = {
    statusCode: initialStatusCode,
    errors: null,
    status: function (code) {
      res.statusCode = code;
      return res;
    },
    json: function (data) {
      if (jsonCallback) {
        jsonCallback(data);
      } else {
        res.errors = data.errors;
      }
    },
  };

  return res;
};
