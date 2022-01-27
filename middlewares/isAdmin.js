const User = require("../models/user.model");
const Role = require("../models/role.model");
isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
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

                if (role.name === "admin") {
                    next();
                    return;
                }

                res.status(403).send({ message: "Require Admin Role!" });
                return;
            }
        );
    });
};
module.exports = isAdmin;   