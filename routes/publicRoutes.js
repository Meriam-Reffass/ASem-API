var express = require("express");
var router = express.Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
var path = require("path");
const Role = require("../models/role.model");
const bcrypt = require("bcryptjs");

router.post("/login", async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "Email does not exist" });
    // check for password correctness
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)
        return res.status(400).json({ error: "Password is wrong" });
    const token = jwt.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
        },
        "meriam123"
    );
    res.header("auth-token", token).json({
        error: null,
        message: "Login successful",
        data: {
            token: token,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
        },
    });
});

router.post("/register", async(req, res) => {
    // const role = await Role.findOne({ name: req.body.role });
    //if (!role) return res.status(400).json({ error: "Role is wrong" });
    const user_f = await User.findOne({ email: req.body.email });
    if (user_f) return res.status(400).json({ error: "Email exist already" });
    const role = await Role.findOne({ name: "student" })
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: role._id,
    });
    try {
        const savedUser = await user.save();
        const token = jwt.sign({
            _id: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
            },
            "meriam123"
        );
        res.json({
            error: null,
            message: "registration successful",
            data: {
                token: token,
                _id: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
            },
        });
    } catch (error) {
        res.status(400).json({ error });
    }
});

module.exports = router;