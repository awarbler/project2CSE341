const { v4: uuidv4 } = require('uuid');
uuidv4(); //
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const DUMMY_USERS = [
  {
    id: 'u1',
    firstName: 'Missy',
    lastName: 'Warbler',
    email: 'test@test.com',
    password: 'testpassword',
    places: 'p1',
    birthday: ''
  }
];

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError('Fetching users failed, please try again later.', 500);
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data', 422));
  } // validation
  const { firstName, lastName, email, password, birthday } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again later', 500);
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError('User exist already, please login', 422);
    return next(error);
  }

  const createdUser = new User({
    firstName,
    lastName,
    email, //
    image: 'https://cdn.firespring.com/images/9e280abb-23b6-47e1-854c-e44fbb420f1d.jpg',
    password,
    places: [],
    birthday
  });
  // mongoose save promise unshift (createPlace)
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('logging in failed, please try again later', 500);
    return next(error);
  }
  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError('Invalid credentials, could not log you in', 401);
    return next(error);
  }

  res.json({ message: 'Logged in!' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
// const { validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs'); // hash passwords
// const jwt = require('jsonwebtoken');

// const HttpError = require('../models/http-error');
// const User = require('../models/user');

// // eslint-disable-next-line no-unused-vars
// // const DUMMY_USERS = [
// //   {
// //     id: 'u1',
// //     firstName: 'Missy',
// //     lastName: 'Warbler',
// //     email: 'test@test.com',
// //     password: 'testpassword',
// //     places: 'p1',
// //     birthday: ''
// //   }
// // ];

// const getUsers = async (req, res, next) => {
//   let users;
//   try {
//     users = await User.find({}, '-password');
//   } catch (err) {
//     const error = new HttpError('Fetching users failed, please try again later.', 500);
//     return next(error);
//   }

//   res.json({ users: users.map((user) => user.toObject({ getters: true })) });
// };

// const signup = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(new HttpError('Invalid inputs passed, please check your data', 422));
//   } // validation

//   const { firstName, lastName, email, password, birthday } = req.body;

//   let existingUser;
//   try {
//     existingUser = await User.findOne({ email: email });
//   } catch (err) {
//     const error = new HttpError('Signing up failed, please try again later', 500);
//     return next(error);
//   }
//   if (existingUser) {
//     const error = new HttpError('User exist already, please login', 422);
//     return next(error);
//   }

//   let hashedPassword;
//   try {
//     hashedPassword = await bcrypt.hash(password, 12);
//   } catch (err) {
//     const error = new HttpError('Could not create user, please try again', 500);
//     return next(error);
//   }
//   const createdUser = new User({
//     firstName,
//     lastName,
//     email, //
//     image: 'https://cdn.firespring.com/images/9e280abb-23b6-47e1-854c-e44fbb420f1d.jpg',
//     password: hashedPassword,
//     places: [],
//     birthday
//   });
//   // mongoose save promise unshift (createPlace)
//   try {
//     await createdUser.save();
//   } catch (err) {
//     const error = new HttpError('Signing up failed, please try again', 500);
//     return next(error);
//   }
//   let token;
//   try {
//     token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, process.env.JWT_KEY, {
//       expiresIn: '1h'
//     });
//   } catch (err) {
//     const error = new HttpError('Signing up failed, please try again', 500);
//     return next(error);
//   }

//   res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });
// };

// const login = async (req, res, next) => {
//   const { email, password } = req.body;

//   let existingUser;

//   try {
//     existingUser = await User.findOne({ email: email });
//   } catch (err) {
//     const error = new HttpError('logging in failed, please try again later', 500);
//     return next(error);
//   }

//   if (!existingUser) {
//     const error = new HttpError('Invalid credentials, could not log you in', 403);
//     return next(error);
//   }

//   let isValidPassword = false;
//   try {
//     isValidPassword = await bcrypt.compare(password, existingUser.password);
//   } catch (err) {
//     const error = new HttpError('Could not log you in , try again ', 500);
//     return next(error);
//   }
//   if (!isValidPassword) {
//     const error = new HttpError('Invalid credentials, could not log you in', 401);
//     return next(error);
//   }

//   let token;
//   try {
//     token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_KEY, {
//       expiresIn: '1h'
//     });
//   } catch (err) {
//     const error = new HttpError('Logging in failed, please try again', 500);
//     return next(error);
//   }
//   res.json({
//     userId: existingUser.id,
//     email: existingUser.email,
//     token: token
//   });
// };

// exports.getUsers = getUsers;
// exports.signup = signup;
// exports.login = login;
