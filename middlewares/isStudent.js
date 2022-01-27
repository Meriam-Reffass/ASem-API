const User = require("../models/user.model");
const Role = require("../models/role.model");
isAdmin = (req, res, next) => {
    User.findById(req.user._id).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.findOne(
            {
                _id: user.role
            },
            (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                if (role.name === "student") {
                    next();
                    return;
                }

                res.status(403).send({ message: "Require Student Role!" });
                return;
            }
        );
    });
};
module.exports = isAdmin;   