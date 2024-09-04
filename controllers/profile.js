const { profile } = require("../modules");

const updateProfile = async (req, res) => {
    try {
        const id = req.decoded.id;
        const { school, mobile, email, city, address, username, language } = req.body;

        const profileImage = req.files['profileImage'] ? req.files['profileImage'][0].path : null;
        const coverImage = req.files['coverImage'] ? req.files['coverImage'][0].path : null;

        // Find the existing profile
        const existingProfile = await profile.findOne({ where: { userId: id } });
        if (!existingProfile) {
            return res.status(404).json({
                message: "Profile Not Found!"
            });
        }

        // Create an object to hold only the fields that are being updated
        const updatedFields = {};

        if (school) updatedFields.school = school;
        if (mobile) updatedFields.mobile = mobile;
        if (email) updatedFields.email= email;
        if (city) updatedFields.city = city;
        if (address) updatedFields.address = address;
        if (language) updatedFields.language = language;
        if (username) updatedFields.username = username;
        if (profileImage) updatedFields.profileImage = profileImage;
        if (coverImage) updatedFields.coverImage = coverImage;

       
        // Update the profile
        await profile.update(updatedFields, {
            where: {
                userId: id,
            },
        });

        return res.status(200).json({
            message: "Profile updated successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while updating the profile.",
            error: error.message
        });
    }
};

const findProfileById = async (req, res) => {
    try{
        let userId = req.decoded.id;
    const Profile = await profile.findOne({ where: { userId: userId } });
    if(!profile) {
       return res.status(404).json({
            message: "Profile Not Found"
        });
        
    } else {
        return res.status(200).json({
            Profile
        });
    }
    }
    catch(error){
        return res.status(500).json({
            message: "Cannot find the profile",
            error: error.message
        });
    }
    
}

module.exports = {
    updateProfile,
    findProfileById
}