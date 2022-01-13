const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
mongoose.connect(
    'mongodb+srv://meriam:<password>@cluster0.kgdxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    },
    () => console.log("connected to db")
);

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});