const express = require('express')
const {createSubject, findAllSubject, deleteSubject} = require('../controllers/subject')
const router = express.Router();

router.post("/addSub", createSubject)
router.get("/allSub", findAllSubject)
router.delete("/delSub/:id", deleteSubject);

module.exports = router;