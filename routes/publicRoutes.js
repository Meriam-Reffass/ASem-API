var express = require('express');
var router = express.Router();

router.post("/api/login", (req, res) => {
    res.json({ message: "rak t connecteti" });
})


router.post("/api/register", (req, res) => {
    res.json({ message: "rak t regestreti" });
})
module.exports = router;