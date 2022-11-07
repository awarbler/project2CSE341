const express = require('express');
const { check } = require('express-validator'); //validation
//error handling
const usersController = require('../controllers/users.controllers');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post(
  '/signup',
  [
    //validate that the title is not empyt
    check('firstName').not().isEmpty(), // is the title  not empty validation
    check('lastName').not().isEmpty(), // is the title  not empty validation
    check('email').normalizeEmail().isEmail(), // is length at least five characters
    check('password').isLength({ min: 6 }), // make sure the address is not empty
    check('birthday').not().isEmpty() // is the title  not empty validation
  ],
  usersController.signup
);

router.post('/login', usersController.login);

// router.patch('/:pid',placesControllers.updatePlace); //

// router.delete('/:pid',placesControllers.deletePlace);

module.exports = router;
