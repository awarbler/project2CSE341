const express = require('express');
//westons way
// const openCors = require("../middleware/openCors");

const router = express.Router();

router.use('/api-docs', require('./swagger'));
router.use('/contact', require('./contacts'));

// weston
// const router = (router) => {
//   router.use([openCors, express.json()]);
//   router.use('/api-docs', require('./swagger'));
//   router.use('/contacts', require('./contacts'));
//   return router;
// };

module.exports = router;
