const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/signup", (req, res, next) => {
    console.log("A req on /signup")
    const email = req.body.email
    const password = req.body.password
    if (!email || !password) {
        res.status(409).send({
            message: "Please supply a valid email + password"
        })
    } else {
        User.create({
            email: email,
            password: bcrypt.hashSync(req.body.password, 10)
        })
            .then(user => {
                res.status(201)
                res.send({ status: "OK" })
            .catch(console.error)
            })
    }
})
module.exports = router;