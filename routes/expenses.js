const express = require("express")
const { addExpense, getAllExpenses, getExpenseById, deleteExpense } = require("../controllers/expense")
const router = express.Router()

router.post("/addExpense", addExpense)
router.get("/getAllExpense", getAllExpenses)
router.get("/getExpenseById/:id", getExpenseById)
router.patch("/updateExpense/:id", getExpenseById)
router.delete("/deleteExpense/:id", deleteExpense)

module.exports = router