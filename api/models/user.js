const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match:[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,'Enter a valid email address']
    },
    password: { type: String, required: true }
});


module.exports = mongoose.model('User', userSchema); 