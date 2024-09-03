const { profile } = require("../modules");

const createProfile = async (req, res) => {
        const userId = req.decoded.id;
        const { school, mobile, city, address, username, language } = req.body;
        const profileImage = req.files['profileImage'] ? req.files['profileImage'][0].path : null;
        const coverImage = req.files['coverImage'] ? req.files['coverImage'][0].path : null;

        try {
        const existingProfile = await profile.findOne({ where: { userId: userId } });
        if (!existingProfile) {
            const newProfile = await profile.create({
            userId: userId,
            school: school, 
            mobile: mobile, 
            city: city, 
            address: address, 
            username: username, 
            language: language, 
            profileImage: profileImage,
              coverImage: coverImage
            });
      
            return res.status(201).json({
              message: 'Profile created successfully!',
              data: newProfile
            });
          } else {
            return res.status(409).json({
              message: 'Profile already exists!'
            });
          }
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while creating the profile.",
            error: error.message
        });
    }
}

const updateProfile = async (req, res) => {
    try {
        const id = req.decoded.id;
        const { school, mobile, city, address, username, language } = req.body;

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

        // Fetch the updated profile to return in the response
        const updatedProfile = await profile.findOne({ where: { userId: id } });

        return res.status(200).json({
            message: "Profile updated successfully",
            data: updatedProfile
        });

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while updating the profile.",
            error: error.message
        });
    }
};

const findProfileById = async (req, res) => {
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

module.exports = {
    createProfile,
    updateProfile,
    findProfileById
}