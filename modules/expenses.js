module.exports = (sequelize, Sequelize) => {
    const expenses = sequelize.define('expense', {
        name: {
            type: Sequelize.STRING
        },
        expenseType: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.INTEGER
        },
        phone: {
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING
        },
        dueDate: {
            type: Sequelize.DATE
        }
    })
    return expenses;
}   