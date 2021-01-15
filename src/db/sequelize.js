const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  oparatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },  
});

sequelize.authenticate()
.then(() => console.log('Db running'))
.catch(err => console.log(err))


module.exports = sequelize