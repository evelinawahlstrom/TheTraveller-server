const { Router } = require('express')
const { toJWT } = require('./jwt')
const bcrypt = require("bcrypt");

const User = require("../user/model");

const router = new Router()

router.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ message: "Please give me some credentials" });
  }
  // Query to find a user by email
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        res.status(400).send({
          message: "Email or password incorrect, sorry"
        });
      }
      else if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          jwt: toJWT({ userId: user.id }) 
          // make a token, with userId encrypted inside of it
        });
      } else {
        res.status(400).send({
          message: "Email or password incorrect, sorry"
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Something went wrong"
      });
    });
});

module.exports = router