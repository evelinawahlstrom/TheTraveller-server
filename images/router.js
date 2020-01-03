const { Router } = require("express")
const Image = require("./model")
const authMiddleWare = require("../auth/middleware");

const router = new Router();

/// get all images
router.get("/images", authMiddleWare, (req, res, next) => {
    Image.findAll()
      .then(images => {
        res.send(images);
      })
      .catch(next);
  });

  // Get an image by id
router.get("/images/:imageId", authMiddleWare, (req, res, next) => {
    Image.findByPk(req.params.imageId)
      .then(image => {
        res.send(image);
      })
      .catch(next);
  });

  module.exports= router