const { Schema, model } = require('mongoose');

const ScriptureSchema = new Schema({
  book: { type: String, required: true },
  chapter: { type: String, required: true },
  verses: { type: [Number], required: true }
});

module.exports = ScriptureSchema;
