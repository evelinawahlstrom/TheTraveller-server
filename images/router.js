const { Router } = require("express")
const Image = require("./model")
const authMiddleWare = require("../auth/middleware");
const Description  = require ('../descriptions/model')

const router = new Router();

// get all images
router.get("/images", authMiddleWare, (req, res, next) => {
    Image.findAll()
      .then(images => {
        res.send(images);
      })
      .catch(next);
  });

// Get an image by id
router.get("/images/:id", authMiddleWare, (req, res, next) => {
    Image.findByPk(req.params.id, { include: Description })
      .then(image => {
        res.send(image);
      })
      .catch(next);
  });

// upload a new image
router.post("/images", authMiddleWare, (req, res, next) => {
    Image.create(req.body)
      .then(image => res.json(image))
      .catch(next)
});

// Delete an image
router.delete("/images/:id", authMiddleWare, (req, res, next) => {
  Image.findByPk(req.params.id)
    .then(image => {
      if (!image) {
        res.status(404).end();
      } else {
        image.destroy();
        res.status(200).end();
      }
    })
    .catch(error => {
      console.error(error);
      response.status(500).end();
    })
})

  module.exports= router