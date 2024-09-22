const express = require("express")
const {getParents} = require("../controllers/parent")
const router = express.Router()

router.get("/getParent", getParents)

module.exports = router