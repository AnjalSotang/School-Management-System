const express = require("express")
const {createStudent, getAllStudent, getStudentById} = require("../controllers/student")
const upload = require("../helpers/upload")
const router = express.Router()

router.post("/addStudent/:id",upload.single("image"), createStudent)
router.get("/getAllStudent", getAllStudent)
router.get("/getStudentById/:id", getStudentById)


module.exports = router