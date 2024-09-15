module.exports = (sequelize, Sequelize) => {
    const student = sequelize.define('student', {
        name: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        class: {
            type: Sequelize.INTEGER
        },
        dob: {
            type: Sequelize.DATE
        },
        bloodGroup: {
            type: Sequelize.STRING
        },
        admissionDate: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        }
    })
    return student;
}   