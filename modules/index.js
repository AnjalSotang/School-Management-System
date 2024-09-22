const {Sequelize} = require("sequelize")

const sequelize = new Sequelize('sns', 'root', '', {
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
db.student = require("./student")(sequelize, Sequelize)
db.parent = require("./parent")(sequelize, Sequelize)
db.teacher = require("./teacher")(sequelize, Sequelize)
db.expense = require("./expenses")(sequelize, Sequelize)
db.fees = require("./fees")(sequelize, Sequelize)

db.users.hasOne(db.profile);
db.profile.belongsTo(db.users)

db.parent.hasMany(db.student)
db.student.belongsTo(db.parent)
db.student.hasMany(db.fees)
db.fees.belongsTo(db.student)

db.teacher.belongsToMany(db.student, { through: 'StudentTeacher', foreignKey: 'teacherId' });
db.student.belongsToMany(db.teacher, { through: 'StudentTeacher', foreignKey: 'studentId' });


module.exports = db;