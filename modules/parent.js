module.exports = (sequelize, Sequelize) => {
    const parent = sequelize.define('parent', {
        father: {
            type: Sequelize.STRING
        },
        mother: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.INTEGER, 
        }, 
        occupation: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        religion: {
            type: Sequelize.STRING, 
        }
    })
    return parent;
}   