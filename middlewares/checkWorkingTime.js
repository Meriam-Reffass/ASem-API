const dayjs = require("dayjs")
// middleware to validate token
const verifyToken = (req, res, next) => {
    const today = dayjs().toDate();
    var weekday = dayjs().format("dddd");
    console.log(weekday.toLowerCase());
    req.weekday = weekday.toLowerCase();
    var currentHour = dayjs().format("HH");
    if (currentHour >= 9 && currentHour < 10) {
        req.timeOfDay = "morning";
        next();
    } else if (currentHour >= 13 && currentHour < 16) {
        req.timeOfDay = "afternoon";
        next();
    } else {
        res.status(400).json({ error: "work time is passed" });
    }
};
//TODO fix workhours
module.exports = verifyToken;   