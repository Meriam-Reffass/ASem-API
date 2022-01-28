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
const Class = require('../models/class.model');



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

// router.get("/admin", [isAdmin], async (res, req) => {
//     //TODO
// });
// router.post("/admin", [isAdmin], async (res, req) => {
//     //TODO
// });
// router.get("/admin/{id}", [isAdmin], async (res, req) => {
//     //TODO
// });
// router.put("/admin/{id}", [isAdmin], async (res, req) => {
//     //TODO
// });
router.get("/students", [isAdmin], async (req, res) => {
    const role = await Role.findOne({ name: "student" });

    const users = await User.find({ role: role._id }).populate("studyClass", "className promo");
    return res.send(users)
});
// router.get("/student/{id}", [isAdmin], async (res, req) => {
//     //TODO
// });
// router.put("/student/{id}", [isAdmin], async (res, req) => {
//     //TODO
// });
// router.delete("/student/{id}", [isAdmin], async (res, req) => {
//     //TODO
// });

router.get("/classes", [isAdmin], async (req, res) => {
    const classes = await Class.find({});
    return res.send(classes)

});
router.post("/classes", [isAdmin], async (req, res) => {
    const class_ = new Class(req.body);

    try {
        class_.save();
        return res.send(class_)

    } catch (error) {
        res.status(500).send({ message: error });

    }

});
router.delete("/classes/:id", [isAdmin], async (req, res) => {

    try {

        await Class.findByIdAndDelete(req.params.id)
        res.status(200).send({ "message": "ok" })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error });

    }

});
router.get("/classes/:id", [isAdmin], async (req, res) => {

    try {

        const cl = await Class.findById(req.params.id)
        res.status(200).send(cl)

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error });

    }

});


router.get("/stats", [isAdmin], async (res, req) => {
    const role = await Role.findOne({ name: "student" });
    const stats = await User.aggregate([{ $match: { role: role._id } },

    {
        $project: {
            _id: 0,
            exclusions_count: { $cond: { if: { $isArray: "$exculsions" }, then: { $size: "$exculsions" }, else: "0" } },
            alerts_count: { $cond: { if: { $isArray: "$alerts" }, then: { $size: "$alerts" }, else: "0" } },
            verifiedHours: "$verifiedHours",
            nonVerifiedHours: "$nonVerifiedHours"
        }
    },

    {
        $group: {
            _id: null,
            sumExclusions: { $sum: "$exclusions_count" },
            sumAlerts: { $sum: "$alerts_count" },
            sumVerifiedHours: { $sum: "$verifiedHours" },
            sumNonVerifiedHours: { $sum: "$nonVerifiedHours" }
        }
    }])

    req.send(stats[0])
});

router.get("/stats/:id", async (req, res) => {
    const role = await Role.findOne({ name: "student" });
    const user = await User.findById(req.params.id);
    const mongoose = require("mongoose");
    const ObjectId = mongoose.Types.ObjectId;
    console.log("khdmt");

    const stats = await User.aggregate([{ $match: { _id: ObjectId(req.params.id) } },

    {
        $project: {
            _id: "$_id",
            exclusions_count: { $cond: { if: { $isArray: "$exculsions" }, then: { $size: "$exculsions" }, else: "0" } },
            alerts_count: { $cond: { if: { $isArray: "$alerts" }, then: { $size: "$alerts" }, else: "0" } },
            verifiedHours: "$verifiedHours",
            nonVerifiedHours: "$nonVerifiedHours"
        }
    },

    {
        $group: {
            _id: null,
            sumExclusions: { $sum: "$exclusions_count" },
            sumAlerts: { $sum: "$alerts_count" },
            sumVerifiedHours: { $sum: "$verifiedHours" },
            sumNonVerifiedHours: { $sum: "$nonVerifiedHours" }
        }
    }])
    res.send(stats[0])
})



module.exports = router;