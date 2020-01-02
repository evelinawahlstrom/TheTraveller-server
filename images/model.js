const Sequelize = require('sequelize');
const db = require('../db');
const User = require('../user/model')

const Image = db.define("image", {
name: {
  type: Sequelize.STRING,
  allowNull: false,
},
picture: {
  type: Sequelize.STRING,
  allowNull: false
}
});

Image.belongsTo(User, { onDelete: 'CASCADE' }) 
User.hasMany(Image) 

module.exports = Image;