const { teacher } = require("../modules");
const { getPagination, getPagingData } = require('../helpers/pagination');
const { Op } = require('sequelize');

const createTeacher = async (req, res) => {
    try {
        const { first, gender, subject, dob, religion, email, phone, address, admissionDate} = req.body;

        const image = req.file ? req.file.path : null;

        const existingTeacher = await teacher.findByPk(id);
        if (existingTeacher) {
            return res.status(409).json({
                message: "Teacher is already added"
            });
        }

        const response = await teacher.create({
            name: first,
            gender: gender,
            subject: subject,
            dob: dob,
            religion: religion,
            email: email,
            phone: phone,
            address: address,
            admissionDate: admissionDate,
            image: image,
        });


        return res.status(201).json({
            message: "Teacher Created Successfully",
            response: response
        });

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while creating.",
            error: error.message
        });
    }
};

//Eager Loading is used to fetch the data through associations
const getAllTeacher = async (req, res) => {
    try {
        // Get page, size, and name from query parameters (with default values)
        const { page, size, name } = req.query;

        // Get pagination details (limit and offset)
        const { limit, offset } = getPagination(page, size);

        // Build the search condition for the name
        const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

        const response = await teacher.findAndCountAll({
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
            message: "An error fetching the teacher data",
            error: error.message
        });
    }
}

const getTeacherById = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await teacher.findOne({
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
            message: "An error fetching the teacher data",
            error: error.message
        });
    }
}

const deleteTeacher = async (req, res) => {
    let { id } = req.params
    try {
        let response = await teacher.destroy({
            where: {
                id: id,
            },
        });

        if (response) {
            res.status(200).json({
                message: "Teacher deleted successfully"
            })
        } else {
            res.status(400).json({
                message: "Teacher not found"
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "An unexpected error occurred while deleting a teacher",
            error: error.message
        });
    }

}


module.exports = {
    createTeacher,
    getAllTeacher,
    getTeacherById,
    deleteTeacher
}
