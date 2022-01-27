const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, unique: true, required: true, match: /.+\@.+\..+/, },
        password: { type: String, required: true },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        },
        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class"
        },
        presence: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "presence"
        }]
    })
);

module.exports = User;