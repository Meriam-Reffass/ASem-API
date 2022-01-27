const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, unique: true, required: true, match: /.+\@.+\..+/, },
        password: { type: String, required: true },
        nonVerifiedHours: { type: Number, default: 0 },
        verifiedHours: { type: Number, default: 0 },
        alerts: [{
            dateOf: { type: Date, default: Date.now }
        }],
        exclusions: [{ 
            dateOf: { type:  Date, default: Date.now }
        }],

        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        },
        studyClass: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class"
        },
        presences: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Presence"
        }]
    })
);

module.exports = User;