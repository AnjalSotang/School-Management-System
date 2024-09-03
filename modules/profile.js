module.exports = (sequelize, Sequelize) => {
    const profile = sequelize.define('Profile', {
        school: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        language: {
            type: Sequelize.STRING
        },
        profileImage: {
            type: Sequelize.STRING, // or DataTypes.TEXT for longer paths
        },
        coverImage: {
            type: Sequelize.STRING, // or DataTypes.TEXT for longer paths
        },
    })
    return profile;
}   