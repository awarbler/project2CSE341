const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// change go to error handle
const getAll = async (req, res) => {
  // #swagger.description = 'Get all contacts'
  mongodb
    // eslint-disable-next-line prettier/prettier
  .getDb().db('CSE341AW').collection('contacts').find().toArray((err,lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  // #swagger.description = 'Get single contacts'
  //validate object id
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('must us a valid contact id to fina a contact.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db('CSE341AW')
    .collection('contacts')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createContact = async (req, res) => {
  const contact = {
    // #swagger.description = 'create contact'
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb.getDb().db('CSE341AW').collection('contacts').insertOne(contact);
  // error handler here
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateContact = async (req, res) => {
  //validate object id
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('must us a valid contact id to fina a contact.');
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    // #swagger.description = 'Update contacts'
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db('CSE341AW')
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  // error handler here
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteContact = async (req, res) => {
  //validate object id
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('must us a valid contact id to fina a contact.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('CSE341AW')
    .collection('contacts')
    .remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
