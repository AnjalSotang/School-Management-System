module.exports = (sequelize, Sequelize) => {
    const fees = sequelize.define('fee', {
        amount: {
            type: Sequelize.INTEGER
        },
        dueDate: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.INTEGER
        }
    })
    return fees;
}   