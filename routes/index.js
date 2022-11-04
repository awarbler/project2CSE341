const express = require('express');
//
const openCors = require('../middleware/openCors');
const cors = require('cors');

// routes
const scriptureRoutes = require('./scriptures');
const authorizationRoutes = require('./authorization');
const docRoutes = require('./docs');

const router = express.Router();

router.options(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  })
);
// GLOBAL MIDDLEWARE
router.use([openCors, express.json()]);
router.use('/authorization', authorizationRoutes);
router.use('/api/v1/scriptures', scriptureRoutes);
router.use('/api-docs', docRoutes);

module.exports = router;
