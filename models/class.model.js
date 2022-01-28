const mongoose = require("mongoose");

const Class = mongoose.model(
    "Class",
    new mongoose.Schema({
        className: { type: String, required: true },
        promo: { type: Number, required: true },
        monday: {
            morning: { type: Boolean, required: true, default: false },
            afternoon: { type: Boolean, required: true, default: false },
        }, tuesday: {
            morning: { type: Boolean, required: true, default: false },
            afternoon: { type: Boolean, required: true, default: false },
        }, wednesday: {
            morning: { type: Boolean, required: true, default: false },
            afternoon: { type: Boolean, required: true, default: false },
        }, thursday: {
            morning: { type: Boolean, required: true, default: false },
            afternoon: { type: Boolean, required: true, default: false },
        }, friday: {
            morning: { type: Boolean, required: true, default: false },
            afternoon: { type: Boolean, required: true, default: false },
        }, saturday: {
            morning: { type: Boolean, required: true, default: false },
            afternoon: { type: Boolean, required: true, default: false },
        },
        sunday: {
            morning: { type: Boolean, required: true, default: false },
            afternoon: { type: Boolean, required: true, default: false },
        },



        // "className": "cloud",
        // "promo": 2024,
        // "monday": {
        //     "morning": true,
        //     "afternoon": true,
        // },
        // "tuesday": {
        //     "morning": true,
        //     "afternoon": true,
        // },
        // "wednesday": {
        //     "morning": true,
        //     "afternoon": true,
        // },
        // "thursday": {
        //     "morning": true,
        //     "afternoon": true,
        // },
        // "friday": {
        //     "morning": true,
        //     "afternoon": true,
        // }
        // ,
        // "saturday": {
        //     "morning": true,
        //     "afternoon": true,
        // },

        
    })
);

module.exports = Class;