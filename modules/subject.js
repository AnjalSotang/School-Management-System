module.exports = (sequelize, Sequelize) => {
    const sub = sequelize.define('subject', {
        name: {
            type: Sequelize.STRING
        },
        teacher: {
            type: Sequelize.STRING
        },
        classes: {
            type: Sequelize.STRING
        },
        days: {
            type: Sequelize.STRING
        }
    })

    return sub;
}