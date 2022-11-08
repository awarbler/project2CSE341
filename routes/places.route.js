const express = require('express');
const { check } = require('express-validator');
// mvc structure  //error handling
const placesControllers = require('../controllers/places.controllers');

const router = express.Router();

router.get('/:pid', placesControllers.getPlaceById);

router.get('/user/:uid', placesControllers.getPlacesByUserId);

// router.use(); // authorization check incoming request and block

router.post(
  '/',
  [
    //validate that the title is not empyt
    check('title').not().isEmpty(), // is the title  not empty validation
    check('description').isLength({ min: 5 }), // is length at least five characters
    check('address').not().isEmpty() // make sure the address is not empty
  ],
  placesControllers.createPlace
);

router.patch(
  '/:pid',
  [
    //validate that the title is not empyt
    check('title').not().isEmpty(), // is the title  not empty validation
    check('description').isLength({ min: 5 }) // is length at least five characters
    // check('address').not().isEmpty(), // make sure the address is not empty
  ],
  placesControllers.updatePlace
);

router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;
// const express = require('express');
// const { check } = require('express-validator');
// // mvc structure  //error handling
// const placesControllers = require('../controllers/places.controllers');
// const checkAuth = require('../middleware/auth');

// const router = express.Router();

// router.get('/:pid', placesControllers.getPlaceById);

// router.get('/user/:uid', placesControllers.getPlacesByUserId);

// router.use(checkAuth); // authorization check incoming request and block

// router.post(
//   '/',
//   [
//     //validate that the title is not empyt
//     check('title').not().isEmpty(), // is the title  not empty validation
//     check('description').isLength({ min: 5 }), // is length at least five characters
//     check('address').not().isEmpty() // make sure the address is not empty
//   ],
//   placesControllers.createPlace
// );

// router.patch(
//   '/:pid',
//   [
//     //validate that the title is not empyt
//     check('title').not().isEmpty(), // is the title  not empty validation
//     check('description').isLength({ min: 5 }) // is length at least five characters
//     // check('address').not().isEmpty(), // make sure the address is not empty
//   ],
//   placesControllers.updatePlace
// );

// router.delete('/:pid', placesControllers.deletePlace);

// module.exports = router;
