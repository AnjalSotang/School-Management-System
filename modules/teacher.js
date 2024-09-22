module.exports = (sequelize, Sequelize) => {
    const teacher = sequelize.define('teacher', {
        name: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        subject: {
            type: Sequelize.STRING
        },
        dob: {
            type: Sequelize.DATE
        },
        religion: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        admissionDate: {
            type: Sequelize.DATE
        },
        image: {
            type: Sequelize.STRING
        }
    })
    return teacher;
} 