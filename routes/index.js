const express = require('express');
const router = express.Router();
//westons way
// const openCors = require("../middleware/openCors");

router.use('/api-docs', require('./swagger'));
router.use('/places', require('./places-routes'));

// weston
// const router = (router) => {
//   router.use([openCors, express.json()]);
//   router.use('/api-docs', require('./swagger'));
//   router.use('/contacts', require('./contacts'));
//   return router;
// };

module.exports = router;
