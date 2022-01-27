const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.class = require("./class.model");
db.presence = require("./presence.model");

db.ROLES = ["admin", "student"];

module.exports = db;