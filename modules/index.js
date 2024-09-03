const {Sequelize} = require("sequelize")

const sequelize = new Sequelize('SMS', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });


  const testingConnectivity = async (req, res) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }

testingConnectivity()

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("./user")(sequelize, Sequelize)
db.profile = require("./profile")(sequelize, Sequelize)

db.users.hasOne(db.profile);
db.profile.belongsTo(db.users)

module.exports = db;