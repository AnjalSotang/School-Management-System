const express = require("express")
const { addFees, viewFees, updateFees, deleteFees } = require("../controllers/fees")
const router = express.Router()

router.post("/addFees", addFees)
router.get("/viewFees", viewFees)
router.patch("/updateFees/:id", updateFees)
router.delete("/deleteFees/:id", deleteFees)

module.exports = router