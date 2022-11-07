const express = require('express');
const routes = express.Router();

// const place = require('./places-routes');
// const express = require('express');
// const router = express.Router();
routes.use('/', require('./swagger'));
routes.use('/places', require('./places.routes'));
routes.use('/user', require('./users.routes'));
// routes.use(
//   '/'
// (docData = (req, res) => {
//   let docData = {
//     documentationURL: 'AJW Documentation'
//   };
//   res.send(docData);
// })
// );

// router.use('/api-docs', require('./swagger'));
// router.use('/places', require('./places-routes'));

// weston
// const router = (router) => {
//   router.use([openCors, express.json()]);
//   router.use('/api-docs', require('./swagger'));
//   router.use('/contacts', require('./contacts'));
//   return router;
// };
module.exports = routes;
// module.exports = router;
