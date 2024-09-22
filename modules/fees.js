module.exports = (sequelize, Sequelize) => {
    const fees = sequelize.define('fee', {
        amount: {
            type: Sequelize.INTEGER
        },
        feeType: {
            type: Sequelize.STRING
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