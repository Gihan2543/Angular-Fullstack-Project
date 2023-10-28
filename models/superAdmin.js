const mongoose = require('mongoose');

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// User Schema
const SuperAdminSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: 'Username is required',
        default: "superadmin"
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        default: "superadmin@domain.con"
    },
    password: {
        type: String,
        required: true,
        default: "superadmin"
    }
});

const SuperAdmin = module.exports = mongoose.model('SuperAdmin', SuperAdminSchema);