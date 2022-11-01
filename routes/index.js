const express = require('express');
//westons way
// const openCors = require("../middleware/openCors");

const router = express.Router();

router.use('/api-docs', require('./swagger'));
router.use('/contacts', require('./contacts'));
router.use('/places', require('./places-routes'));
router.use('/users'), require('./users-routes');

// weston
// const router = (router) => {
//   router.use([openCors, express.json()]);
//   router.use('/api-docs', require('./swagger'));
//   router.use('/contact', require('./contact'));
//   return router;
// };

module.exports = router;
