const validator = require('../helpers/validate');
const saveContact = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|string',
    favoriteColor: 'required|string',
    birthday: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      // eslint-disable-next-line prettier/prettier
        next();
    }
  });
};
module.exports = {
  saveContact
};
