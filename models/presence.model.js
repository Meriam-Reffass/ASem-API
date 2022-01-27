const mongoose = require("mongoose");

const Presence = mongoose.model(
    "Presence",
    new mongoose.Schema({
        dayOfThePresence: { type: Date, default: Date.now  },
        morning: { type: Boolean, default: false  },
        afternoon: { type: Boolean, default: false  },


    })
);

module.exports = Presence;