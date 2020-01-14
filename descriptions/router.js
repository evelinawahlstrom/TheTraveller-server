const { Router } = require("express");
const Description = require ("./model")
const Image = require ("../images/model")
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

// Update an existing description
router.put("/images/:id", authMiddleWare, (req, res, next) => {
  Description.findOne({ include: Image },{
    where: {
      id: req.params.id,
      imageId: req.params.imageId
    }
  })
    .then(description => {
      if (description) {
        description
          .update(req.body)
          .then(description => res.json(description));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

  
module.exports = router;
