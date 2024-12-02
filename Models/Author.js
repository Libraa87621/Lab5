const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String },
    birthDate: { type: Date },
});

module.exports = mongoose.model('Author', authorSchema);
