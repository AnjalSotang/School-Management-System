const {subject} = require("../modules")
const { getPagination, getPagingData } = require('../helpers/pagination');

const createSubject = async (req, res) => {
    const { id } = req.params;  
    const {name, teacher, clss, day} = req.body;

    try{
        const checkAvailability = await subject.findByPk(id);
        if(checkAvailability){
            return res.status(409).json({
                error: "This subject is already added!!"
            })
        }

        await subject.create({
            name: name,
            teacher: teacher,
            class: clss,
            days: day
        })

        return res.status(200).json({
            message: "Subject Added Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            message: "An error while adding the subject",
            error: error.message
        })
    }
}

const findAllSubject = async(req, res) => {
    try{
         // Get page, size, and name from query parameters (with default values)
         const { page, size, name } = req.query;

         // Get pagination details (limit and offset)
         const { limit, offset } = getPagination(page, size);
 
         // Build the search condition for the name
         const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

        const allSubject = await subject.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit,
    })
        // Get paginated data and structure the response
        const pagingData = getPagingData(allSubject, page, limit);


        return res.status(200).json({
            data: pagingData
        })
}
    catch(error){
        return res.status(500).json({
            message: "Cannot get the all the subject",
            error: error.message
        })
    }
}

const deleteSubject = async (req, res) => {
    const { id } = req.params;

    try {
        const findSubject = await subject.findByPk(id); // Changed variable to findSubject

        if (!findSubject) {
            return res.status(404).json({
                message: "Subject does not exist" // Changed message to reflect "Subject"
            });
        }

        await subject.destroy({
            where: { id: id }
        });

        return res.status(200).json({
            message: "Successfully Deleted"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Cannot delete the subject",
            error: error.message
        });
    }
};


module.exports = {
    createSubject,
    findAllSubject,
    deleteSubject
}