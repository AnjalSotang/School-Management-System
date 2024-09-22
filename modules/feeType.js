module.exports = (sequelize, Sequelize) => {
    const res = sequelize.define('feeType', {
        name: {
            type: Sequelize.INTEGER
        },
        feeType: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    })
    return res;
}   