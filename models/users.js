const mongoose = require('mongoose');
const crypto = require('node:crypto');

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        unique: true,
        required: true 
    },
    firstName: {
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    gender: { 
        type: String, 
        required: true, 
        enum: ["male", "female"] 
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    salt: {
        type: String 
    },
});

userSchema.pre("save",async function (next) {
    if (!this.isModified('password')) return next();

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(this.password, salt, 100000, 64, 'sha512').toString('hex');

    this.password = hash;
    this.salt = salt;
});

userSchema.methods.verifyPassword = function (inputPassword) {
    const hash = crypto.pbkdf2Sync(
        inputPassword,
        this.salt,
        100000,
        64,
        'sha512'
    ).toString('hex');

    return hash === this.password;
};

module.exports = mongoose.model("User", userSchema);