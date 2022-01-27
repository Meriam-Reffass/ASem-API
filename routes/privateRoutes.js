var express = require('express');
var router = express.Router();
const User = require("../models/user.model");
const Role = require("../models/role.model");
const isAdmin = require("../middlewares/isAdmin")
const isStudent = require("../middlewares/isStudent");
const Class = require('../models/class.model');



router.post("/addPresence", [isStudent], async (req, res) => {
    const dayjs = require("dayjs");
    const user = await User.findOne({ _id: req.user._id }).populate("class");
    const class_user = await Class.findOne({ _id: user.class });
    user.populate("presence", null, { dayOfThePresence: dayjs().toDate() }).exec((err, presence) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!presence){
            
        }

    })







    res.status(200).send({ message: "ok" });


});


module.exports = router;