const Sequelize = require('sequelize')
const sequelize = require('../db/sequelize')
const Biz = require('../models/business')

const Staff = sequelize.define('employees', {
    id: {
        type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      allowNull: false
    },
    staff_fname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    staff_lname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    staff_email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    staff_position: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: { 
                args: [['kitchen','service','PR']],
                msg: 'Must be kitchen, service or PR'
            }
        }
        
    },
    staff_biz: {
        type: Sequelize.STRING,
        allowNull: false
    },
    staff_phone: {
        type: Sequelize.INTEGER
    },
    biz_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: Biz,
            key: 'id'
        }
    }
})

Biz.hasMany(Staff, {
    foreignKey: {
        name: 'biz_id',
        allowNull: false
      }
})

module.exports = Staff