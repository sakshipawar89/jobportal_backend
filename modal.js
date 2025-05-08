const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
    company: String,
});

module.exports = mongoose.model('Token_generate', loginSchema);
