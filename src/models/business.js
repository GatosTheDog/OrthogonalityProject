const Sequelize = require('sequelize')
const sequelize = require('../db/sequelize')
//const Staff = require('./employees')

const Biz = sequelize.define('biz', {
    id: {
        type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      allowNull: false
    },
    biz_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    biz_location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    biz_type: {
        type: Sequelize.STRING,
        validate: {
            isIn: { 
                args: [['bar','restaurant','club','hotel','cafe']],
                msg: 'Must be bar, restaurant, club, hotel or cafe' 
            }
        }
    },
})


module.exports = Biz