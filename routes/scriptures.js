const { Router } = require('express');
const ScriptureController = require('../controllers/scriptures.controller');
const loadUser = require('../middleware/loaduser');

const router = Router();

router.use([loadUser]);

router.get('/', ScriptureController.index);

module.exports = router;
