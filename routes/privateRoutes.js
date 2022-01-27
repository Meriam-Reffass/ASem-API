var express = require('express');
var router = express.Router();
const User = require("../models/user.model");
const Role = require("../models/role.model");
const isAdmin = require("../middlewares/isAdmin")
const isStudent = require("../middlewares/isStudent");
const classModel = require('../models/class.model');
const Presence = require('../models/presence.model');
const checkWorkingTime = require("../middlewares/checkWorkingTime");
const moment = require("moment");



router.post("/addPresence", [isStudent, checkWorkingTime], async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    const class_user = await classModel.findOne({ _id: user.studyClass });
    const studiying = class_user[req.weekday][req.timeOfDay];
    console.log(studiying);

    if (!studiying) {

        res.status(400).send({ "message": "your are not studying at the moment" })
        return;
    }
    const today = moment().startOf('day')


    await user.populate("presences"
        , null, {
        dayOfThePresence: {
            $gte: today.toDate(),
            $lt: moment(today).endOf('day').toDate()
        }
    }
    )
    var presence = {};
    if (user.presences.length == 0) {
        presence = new Presence({
            dayOfThePresence: new Date()
        })
        presence = await presence.save();
        user.presences.push(presence._id);
        await user.save();
    }
    else {

        console.log(user.presences[0])
        presence = await Presence.findById({ _id: user.presences[0]._id })
    }

    if (req.timeOfDay == "morning") {
        presence.morning = true;
        await presence.save();
        console.log("updating morning");
        res.status(200).send({ "message": "presence marked for morning" })
        return;
    }
    else {
        presence.afternoon = true;
        await presence.save();

        console.log("updating afternoon");
        res.status(200).send({ "message": "presence marked for afternoon" })

        return;
    }


    res.status(500).send({ "message": "error in the backend" })






});


module.exports = router;