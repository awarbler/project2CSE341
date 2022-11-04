const express = require('express');
const router = express.Router();
// const { index, show } = require("../controllers/contacts.controller");

const contactsController = require('../controllers/contacts.controller');
// validation
const validation = require('../middleware/validate');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);
// validation
router.post('/', validation.saveContact, contactsController.createContact);
// request made hand by this function
router.put('/:id', validation.saveContact, contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;
