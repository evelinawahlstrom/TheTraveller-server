// Requirements
const express = require('express')
const db = require('./db')

// Routers
const userRouter = require('./user/router')
const authRouter = require('./auth/router')
const imageRouter = require ('./images/router')
const desRouter = require ('./descriptions/router')

// Models
const User = require('./user/model')
const Image = require ('./images/model')
const Description = require ('./descriptions/model')

// Middlewares
// const authMiddleWare = require ('./auth/middleware')
const bodyParser = require('body-parser')
const bodyParserMiddleWare = bodyParser.json()
// Connecting with frontend
const cors = require('cors')
const corsMiddleWare = cors()

const app = express()
const port = process.env.PORT || 4000

const loggingMiddleWare = (req, res, next) => {
    console.log("I am a middleware", Date.now());
    next(); 
  };

app
  // use auth middleware for entire routers (maybe a bit heavy handed)
    .use(loggingMiddleWare)
    .use(corsMiddleWare)
    .use(bodyParserMiddleWare)
    .use(userRouter)
    .use(authRouter)
    .use(imageRouter)
    .use(desRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// force: true as long as development is in process
db.sync({ force: true })
  .then(() => {
    const imageDescriptions = [
    { name: "Picture 1", picture: "https://onestep4ward.com/wp-content/uploads/2019/06/Travel.jpg", userId: 1 },
    { name: "Picture 2", picture: "https://cdn.blueswandaily.com//2018/11/Travel000-2000x1200.jpg", userId: 1 },
    { name: "Picture 3", picture: "https://specials-images.forbesimg.com/imageserve/5ddb53922c886a0007ecfddd/960x0.jpg?cropX1=119&cropX2=2001&cropY1=0&cropY2=1411", userId: 1 },
    { name: "Picture 4", picture: "https://onestep4ward.com/wp-content/uploads/2019/06/Travel.jpg", userId: 1 },
    { name: "Picture 5", picture: "https://cdn.blueswandaily.com//2018/11/Travel000-2000x1200.jpg", userId: 1 },
    { name: "Picture 6", picture: "https://specials-images.forbesimg.com/imageserve/5ddb53922c886a0007ecfddd/960x0.jpg?cropX1=119&cropX2=2001&cropY1=0&cropY2=1411", userId: 1 },
    { name: "Picture 7", picture: "https://specials-images.forbesimg.com/imageserve/5ddb53922c886a0007ecfddd/960x0.jpg?cropX1=119&cropX2=2001&cropY1=0&cropY2=1411", userId: 1 },
    { name: "Picture 8", picture: "https://specials-images.forbesimg.com/imageserve/5ddb53922c886a0007ecfddd/960x0.jpg?cropX1=119&cropX2=2001&cropY1=0&cropY2=1411", userId: 1 },
    { name: "Picture 9", picture: "https://onestep4ward.com/wp-content/uploads/2019/06/Travel.jpg", userId: 1 },
    { name: "Picture 10", picture: "https://onestep4ward.com/wp-content/uploads/2019/06/Travel.jpg", userId: 1 },
    { name: "Picture 11", picture: "https://onestep4ward.com/wp-content/uploads/2019/06/Travel.jpg", userId: 1 },
    { name: "Picture 12", picture: "https://onestep4ward.com/wp-content/uploads/2019/06/Travel.jpg", userId: 1 },
   ]
    const images = imageDescriptions.map(imageDescription => Image.create(imageDescription));
    return Promise.all(images);
  })
.catch(console.error)

