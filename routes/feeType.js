const express = require("express")
const { addFeeType, viewFeeType, updateFeeType, deleteFeeType } = require("../controllers/feeType")
const router = express.Router()

router.post("/addFeeType", addFeeType)
router.get("/viewFeeType", viewFeeType)
router.patch("/updateFeeType/:id", updateFeeType)
router.delete("/deleteFeeType/:id", deleteFeeType)

module.exports = router