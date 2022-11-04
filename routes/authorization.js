const { Router } = require('express');
const AuthorizationController = require('../controllers/authorization.controller');

const router = Router();

router.get('/login', AuthorizationController.login);
router.get('/callback', AuthorizationController.callback);

module.exports = router;
