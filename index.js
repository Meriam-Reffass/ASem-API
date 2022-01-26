const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const db = require("./models");
const Role = db.role;
const publicRoutes = require("./routes/publicRoutes");

const app = express();
mongoose.connect(
    "mongodb://localhost:27017/ASem", {
        useNewUrlParser: true,
        // useFindAndModify: true,
        // useUnifiedTopology: true,
    },
    () => {
        console.log("connected to db");
        // initial();
    }
);

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to ASem application." });
});
app.use("/", publicRoutes)
    // set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
const initial = function() {
    console.log("bdit lkhdma");

    new Role({
        name: "student",
    }).save((err) => {
        if (err) {
            console.log("error", err);
        }

        console.log("added 'student' to roles collection");
    });
    new Role({
        name: "admin",
    }).save((err) => {
        if (err) {
            console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
    });
};