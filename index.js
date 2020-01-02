// Requirements
const express = require('express')
const db = require('./db')

// Routers
const userRouter = require('./user/router')
const authRouter = require('./auth/router')
const imageRouter = require ('./images/router')

// Models
const User = require('./user/model')
const Image = require ('./images/model')

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// force: true as long as development is in process
db.sync({ force: true })
  .then(() => {
    console.log("Database schema has been updated.");

    const userNames= [
     { email: "traveller@gmail.com", password: "worldtraveller" },  
    ]
    const users = userNames.map(userName => User.create(userName));
    return Promise.all(users)
  })
  .then(() => {
    const imageDescriptions = [
      { name: "Test", picture: "https://onestep4ward.com/wp-content/uploads/2019/06/Travel.jpg",userId: 1 } ]
    const images = imageDescriptions.map(imageDescription => Image.create(imageDescription));
    return Promise.all(images);
  })
.catch(console.error)