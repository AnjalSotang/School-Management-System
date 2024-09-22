const { student, fees, parent } = require("../modules")
const { getPagination, getPagingData } = require('../helpers/pagination');
const { Op } = require('sequelize');


const addFees = async (req, res) => {
    const { id, amount, feeType, dueDate, status } = req.body;

    try {

        const find = await student.findByPk(id)
        if (!find) {
            return res.status(404).json({ message: "Stundent is not available!!" })
        }
        const validate = await fees.findOne({
            where:
            {
                feeType,
                dueDate,
                status,
                studentId: id
            }
        })

        if (!validate) {
            const response = await fees.create({
                amount,
                feeType,
                dueDate,
                status,
                studentId: id
            })

            return res.status(200).json({
                message: "Fees added successfully",
                data: response
            })
        } else {
            return res.status(409).json({
                message: "Fee is already added"
            })
        }

    }
    catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong",
            error: error.message
        })
    }
}

const viewFees = async (req, res) => {
    try {
        // Get page, size, and name from query parameters (with default values)
        const { page, size, name } = req.query;

        // Get pagination details (limit and offset)
        const { limit, offset } = getPagination(page, size);

        // Build the search condition for the name
        const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

        const response = await fees.findAndCountAll({
            attributes: [
                'studentId',
                'amount',
                'feeType',
                'dueDate',
                'status'
            ],
            include: [{
                model: student,
                attributes: ['name', 'gender', 'class'],
                include: [{
                    model: parent, // Assuming parent model is related to student
                    attributes: ['email', 'phone'] // Add desired parent attributes
                }]
            }],
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
            message: "Something Went Wrong",
            error: error.message
        })
    }
}

const updateFees = async (req, res) => {
    const { id } = req.params;
    const { amount, feeType, dueDate, status } = req.body;

    try {
        const fee = await fees.findByPk(id);
        if (!fee) {
            return res.status(404).json({
                message: "Fee data is not avaiblable"
            })
        }

        // Create an object to hold only the fields that are being updated
        const updatedFields = {};

        if (amount) updatedFields.amount = amount;
        if (feeType) updatedFields.feeType = feeType;
        if (dueDate) updatedFields.dueDate = dueDate;
        if (status) updatedFields.status = status;

        // Update the profile
        await fees.update(updatedFields, {
            where: {
                id: id,
            },
        });

        return res.status(200).json({
            message: "Successfully Updated"
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

const deleteFees = async (req, res) => {
    const { id } = req.params;
    try {
        const fee = await fees.findByPk(id);
        if (!fee) {
            return res.status(404).json({
                message: "Fee data is already deleted"
            })
        }
        await fees.destroy({where: {
            id: id
        }})

        return res.status(200).json({
            message: "Successfully Deleted"
        })

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

module.exports = {
    addFees,
    viewFees,
    updateFees,
    deleteFees
}