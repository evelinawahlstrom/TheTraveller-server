const Sequelize = require('sequelize');
const db = require('../db');
const Image = require ('../images/model')

const Description = db.define("description", {
    text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      });

Description.belongsTo(Image, { onDelete: 'CASCADE' }) 
Image.hasMany(Description) 
module.exports = Description;
