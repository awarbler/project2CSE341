const express = require('express');
const router = express.Router();
// const { index, show } = require("../controllers/contacts.controller");

const contactsController = require('../controllers/contacts.controller');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createContact);
// request made hand by this function
router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;
