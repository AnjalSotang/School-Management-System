const { parent, student, teacher } = require("../modules");
const { getPagination, getPagingData } = require('../helpers/pagination');
const { Op } = require('sequelize');

const createStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, gender, clss, dob, bloodGroup, religion, admissionDate, father, mother, email, phone, occupation, address, teacherId } = req.body;

        const image = req.file ? req.file.path : null;

        // Check if the student already exists
        const existingStudent = await student.findByPk(id);
        if (existingStudent) {
            return res.status(409).json({
                message: "Student is already added"
            });
        }

        // Create the parent record
        const par = await parent.create({
            name: name,
            father: father,
            mother: mother,
            email: email,
            phone: phone,
            occupation: occupation,
            address: address,
            religion: religion
        });

        // Create the student record
        const newStudent = await student.create({
            name: name,
            gender: gender,
            class: clss,
            dob: dob,
            bloodGroup: bloodGroup,
            admissionDate: admissionDate,
            image: image,
            parentId: par.id
        });

        // Check if teacher IDs are provided and link the student to the teachers
        if (teacherId && teacherId.length > 0) {
            const teachers = await teacher.findAll({
                where: {
                    id: teacherId,
                },
            });

            // Check if all provided teacher IDs are valid
            if (teachers.length !== teacherId.length) {
                return res.status(404).json({ error: 'One or more teachers not found' });
            }

            // Link the student to the teachers
            await newStudent.addTeachers(teachers);
        }

        return res.status(201).json({
            message: "Student and Parent Created Successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while creating.",
            error: error.message
        });
    }
};
//Eager Loading is used to fetch the data through associations
const getAllStudent = async (req, res) => {
    try {
        // Get page, size, and name from query parameters (with default values)
        const { page, size, name } = req.query;

        // Get pagination details (limit and offset)
        const { limit, offset } = getPagination(page, size);

        // Build the search condition for the name
        const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

        const response = await student.findAndCountAll({
            attributes: ['id', 'name', 'gender', 'class', 'dob'],
            include: [{
                model: parent,
                attributes: ['mother', 'phone', 'address']
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
            message: "An error fetching the student data",
            error: error.message
        });
    }
}

const getStudentById = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await student.findOne({
            attributes: ['id', 'name', 'gender', 'class', 'dob', 'admissionDate', 'class', 'image'],
            include: [{
                model: parent,
                attributes: ['father', 'mother', 'phone', 'address', 'religion', 'occupation', 'email']
            }],
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

const classPromotion = async (req, res) => {
    const { id, currentClass, promotionClass } = req.body;

    try {
        // Check if the student exists with the given id and class
        const checkStudent = await student.findOne({ where: { id: id, class: currentClass } });

        if (!checkStudent) {
            return res.status(404).json({
                error: "Student Not Found"
            });
        }

        // Prevent demotion
        if (Number(promotionClass) <= checkStudent.class) {
            return res.status(400).json({
                error: "Cannot get demoted"
            });
        }

        // Update the class
        const [updated] = await student.update(
            { class: promotionClass },
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
            message: "Student class promoted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while promoting a student",
            error: error.message
        });
    }
};

const deleteStudent = async (req, res) => {
    let { id } = req.params
    try {
        let response = await student.destroy({
            where: {
                id: id
            }
        });

        if (response) {
            res.status(200).json({
                message: "Product deleted successfully"
            })
        } else {
            res.status(400).json({
                message: "Product not found"
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "An unexpected error occurred while deleting a student",
            error: error.message
        });
    }

}


module.exports = {
    createStudent,
    getAllStudent,
    getStudentById,
    classPromotion,
    deleteStudent
}
