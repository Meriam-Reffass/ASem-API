const mongoose = require("mongoose");

const Class = mongoose.model(
    "Class",
    new mongoose.Schema({
        className: { type: String, required: true },
        promo: { type: Number, required: true },
        mondayMorning: { type: Boolean,  required: true},
        mondayAfterNoon: { type: Boolean,  required: true},
        tuesdayMorning: { type: Boolean,  required: true},
        tuesdayAfterNoon: { type: Boolean,  required: true},
        wednesdayMorning: { type: Boolean,  required: true},
        wednesdayAfterNoon: { type: Boolean,  required: true},
        thursdayMorning: { type: Boolean,  required: true},
        thursdayAfterNoon: { type: Boolean,  required: true},
        fridayMorning: { type: Boolean,  required: true},
        fridayAfterNoon: { type: Boolean,  required: true},
        saturdayMorning: { type: Boolean,  required: true},
        saturdayAfterNoon: { type: Boolean,  required: true},

    })
);

module.exports = Class;