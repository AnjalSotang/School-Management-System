const { expense } = require("../modules");
const { getPagination, getPagingData } = require('../helpers/pagination');
const { Op } = require('sequelize');

const addExpense = async (req, res) => {
    const { name, expenseType, status, amount, phone, email, dueDate} = req.body
    try {
    // Check for existing expense
    const existingExpense = await expense.findOne({
        where: {
            name, 
            expenseType, 
            status,
            amount,
            phone,
            email,
            dueDate
        }
    });

    if (existingExpense) {
        return res.status(409).json({ message: 'An expense with the same details already exists.' });
    }

        const response = await expense.create({
            name: name,
            expenseType: expenseType,
            status: status,
            amount: amount,
            phone: phone,
            email: email,
            dueDate: dueDate
        });

        return res.status(201).json({
            message: "Expenses Added Successfully",
            response
        });

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while adding expenses.",
            error: error.message
        });
    }
};
//Eager Loading is used to fetch the data through associations
const getAllExpenses = async (req, res) => {
    try {
        // Get page, size, and name from query parameters (with default values)
        const { page, size, name } = req.query;

        // Get pagination details (limit and offset)
        const { limit, offset } = getPagination(page, size);

        // Build the search condition for the name
        const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

        const response = await expense.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit,
        })

        // Get paginated data and structure the response
        const pagingData = getPagingData(response, page, limit);


        return res.status(200).json({
            data: pagingData
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "An error fetching the student data",
            error: error.message
        });
    }
}

const getExpenseById = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await expense.findOne({
            where: { id: id }
        })
        if (!response) {
            return res.status(404).json({
                error: "Not Found"
            })
        }
        return res.status(200).json({
            data: response
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "An error fetching the student data",
            error: error.message
        });
    }
}

const updateStatus = async (req, res) => {
    const { id } = req.params;

    const { name, expenseType, status, amount, phone, email, dueDate} = req.body
    try {
        // Check if the student exists with the given id and class
        const checkExpense = await expense.findOne({ where: { id: id} });

        if (!checkExpense) {
            return res.status(404).json({
                error: "Expense Not Found"
            });
        }

        // Update the class
        const [updated] = await student.update(
            { name: name, expenseType: expenseType, status: status, amount: amount, phone: phone, email: email, dueDate: dueDate},
            { where: { id: id } }
        );

        // Check if the update was successful
        if (updated === 0) {
            return res.status(500).json({
                error: "Update was not successful"
            });
        }

        // Success response
        return res.status(200).json({
            message: "Updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred editing expenses",
            error: error.message
        });
    }
};

const deleteExpense = async (req, res) => {
    let { id } = req.params
    try {
        let response = await expense.destroy({
            where: {
                id: id,
            },
        });

        if (response) {
            res.status(200).json({
                message: "Expense deleted successfully"
            })
        } else {
            res.status(400).json({
                message: "Expense not found"
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "An unexpected error occurred while deleting a expense",
            error: error.message
        });
    }

}


module.exports = {
    addExpense,
    getAllExpenses,
    getExpenseById,
    updateStatus,
    deleteExpense
}
