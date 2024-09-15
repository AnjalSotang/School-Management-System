const express = require('express');
const { login, user_forgotPassword, resetPassword  } = require("../controllers/auth");
const { updateProfile, findProfileById} = require("../controllers/profile")
const { checkTokenAndRole } = require("../middleware/checkToken")
const upload = require("../helpers/upload")
const router = express.Router();

router.post("/login", login);
router.post('/forget', user_forgotPassword);
router.post('/reset', resetPassword)
// // Define the fields to upload
// router.post("/createProfile",
//     upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]),
//     checkTokenAndRole("admin"),
//     createProfile
// );

router.patch("/updateProfile", 
    upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]),
    checkTokenAndRole("admin"),
    updateProfile)

router.get('/findProfile',checkTokenAndRole("user"), findProfileById);

module.exports = router