const { Router } = require("express");
const Description = require ("./model")
const authMiddleWare = require("../auth/middleware");

const router = new Router()

// Add a new description
router.post("/images/:id", authMiddleWare, (req, res, next) => {
    const { text, imageId } = req.body;
    Description.create({
    text,
    imageId
    })
      .then(description => res.json(description))
      .catch(next)
  });
  
module.exports = router;
