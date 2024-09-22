const { feeTypes } = require("../modules")
const { getPagination, getPagingData } = require('../helpers/pagination');
const { Op } = require('sequelize');


const addFeeType = async (req, res) => {
    const { id, name, feeType, description } = req.body;

    try {
        const find = await feeTypes.findByPk(id)

        if (!find) {
            const response = await feeTypes.create({
                id,
                name, 
                feeType, 
                description
            })

            return res.status(200).json({
                message: "FeeType added successfully",
                data: response
            })
        } else {
            return res.status(409).json({
                message: "FeeType is already added"
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

const viewFeeType = async (req, res) => {
    try {
        // Get page, size, and name from query parameters (with default values)
        const { page, size, name } = req.query;

        // Get pagination details (limit and offset)
        const { limit, offset } = getPagination(page, size);

        // Build the search condition for the name
        const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

        const response = await feeTypes.findAndCountAll({
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

const updateFeeType = async (req, res) => {
    const { id } = req.params;
    const { name, feeType, description  } = req.body;

    try {
        const fee = await feeTypes.findByPk(id);
        if (!fee) {
            return res.status(404).json({
                message: "Fee data is not avaiblable"
            })
        }

        // Create an object to hold only the fields that are being updated
        const updatedFields = {};

        if (name) updatedFields.name = name;
        if (feeType) updatedFields.feeType = feeType;
        if (description) updatedFields.description = description;

        // Update the profile
        await feeTypes.update(updatedFields, {
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

const deleteFeeType = async (req, res) => {
    const { id } = req.params;
    try {
        const fee = await feeTypes.findByPk(id);
        if (!fee) {
            return res.status(404).json({
                message: "FeeType's data is already deleted"
            })
        }
        await feeTypes.destroy({where: {
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
    addFeeType,
    viewFeeType,
    updateFeeType,
    deleteFeeType
}