const express = require("express")
const {createTeacher, getAllTeacher, getTeacherById, deleteTeacher} = require("../controllers/teacher")
const upload = require("../helpers/upload")
const router = express.Router()

router.post("/addTeacher",upload.single("image"), createTeacher)
router.get("/getAllTeacher", getAllTeacher)
router.get("/getTeacherById/:id", getTeacherById)
router.delete("/deleteTeacher/:id", deleteTeacher)

module.exports = router