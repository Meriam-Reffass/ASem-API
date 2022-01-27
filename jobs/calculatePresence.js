const dayjs = require("dayjs");
const User = require("../models/user.model")
const CronJob = require('cron').CronJob;
const classModel = require('../models/class.model');
const Presence = require('../models/presence.model');
const moment = require("moment");

const job = new CronJob('00 00 10,16 * * 1-6', function () {
    User.find({}, (err, users) => {
        users.forEach(async (user) => {
            const class_user = await classModel.findOne({ _id: user.studyClass });
            var weekday = dayjs().format("dddd").toLowerCase();
            var currentHour = dayjs().format("HH");
            var timeOfDay = ""
            if (currentHour >= 9 && currentHour < 14) {
                timeOfDay = "morning";
            } else if (currentHour >= 14 && currentHour < 20) {
                timeOfDay = "afternoon";
            }
            const studiying = class_user[weekday][timeOfDay];
            console.log(1);
            if (studiying) {
                const oldValueHours = user.nonVerifiedHours
                const today = moment().startOf('day')

                await user.populate("presences", null, {
                    dayOfThePresence: {
                        $gte: today.toDate(),
                        $lt: moment(today).endOf('day').toDate()
                    }

                });
                if (user.presences.length == 0) {
                    user.nonVerifiedHours += 3;

                    user.save();
                    console.log(3);

                }
                else {
                    console.log(4);

                    if (timeOfDay == "morning") {
                        if (!user.presences[0].morning) {
                            user.nonVerifiedHours = user.nonVerifiedHours + 3;
                            console.log("adding from morning");
                            user.save();
                            console.log(5);

                        }

                    }
                    else {
                        if (!user.presences[0].afternoon) {
                            user.nonVerifiedHours = user.nonVerifiedHours + 3;
                            console.log("adding from morning");

                            user.save();
                            console.log(6);

                        }
                    }
                }

                if (user.nonVerifiedHours != oldValueHours) {
                    if (user.nonVerifiedHours > 20)
                        user.alerts.push({});
                    else
                        user.exclusions.push({});
                    user.save()
                }
            }


        }
        )
    }
    );
});
const calculatePresence = async () => {
    console.log("statrting to run")
    User.find({}, (err, users) => {
        console.log(users.length)
        users.forEach(async (user) => {
            console.log("checking for user " + user);
            const class_user = await classModel.findOne({ _id: user.studyClass });
            var weekday = weekday.toLowerCase();
            var currentHour = dayjs().format("HH");
            if (currentHour >= 9 && currentHour < 10) {
                var timeOfDay = "morning";
            } else if (currentHour >= 13 && currentHour < 15) {
                var timeOfDay = "afternoon";
            }
            const studiying = class_user[weekday][timeOfDay];
            if (studiying) {
                await user.populate("presences", null, {
                    dayOfThePresence: {
                        $gte: dayjs().toDate(),
                        $lt: dayjs().endOf("day").toDate()
                    }
                });
                if (user.presences.length == 0) {
                    user.nonVerifiedHours += 3;
                    user.save();
                }
                else {
                    if (timeOfDay == "morning") {
                        if (!user.presences[0].morning) {
                            user.nonVerifiedHours = user.nonVerifiedHours + 3;
                            console.log("adding from morning");
                            user.save();
                        }

                    }
                    else {
                        if (!user.presences[0].afternoon) {
                            user.nonVerifiedHours = user.nonVerifiedHours + 3;
                            console.log("adding from morning");

                            user.save();
                        }
                    }
                }


            }


        }
        )
    });

    console.log("Finished running at " + dayjs().format("HH:mm DD/MM/YYYY"))

}
module.exports = job; 