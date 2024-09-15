const { parent, student} = require("../modules");

const createStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, gender, clss, dob, bloodGroup, religion, admissionDate, father, mother, email, phone, occupation, address } = req.body;

        const image = req.file ? req.file.path : null;

        const existingStudent = await student.findByPk(id);
        if (existingStudent) {
            return res.status(409).json({
                message: "Student is already added"
            });
        }

        const par= await parent.create({
            name: name,
            father: father, mother: mother, email: email, phone: phone, occupation, address: address, religion: religion
        });

       await student.create({
            name: name,
            gender: gender,
            class: clss,
            dob: dob,
            bloodGroup: bloodGroup,
            admissionDate: admissionDate,
            image: image,
            parentId : par.id
        });


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
const getAllStudent = async(req, res) => {
    try{
        const response = await student.findAll({
            attributes: ['id', 'name', 'gender', 'class', 'dob'],
            include: [{
                model: parent,
                attributes: ['mother', 'phone', 'address']
            }]
        })
        
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

const getStudentById = async(req, res) => {
    const {id} = req.params;

    try{
        const response = await student.findOne({
            attributes: ['id', 'name', 'gender', 'class', 'dob', 'admissionDate', 'class', 'image'],
            include: [{
                model: parent,
                attributes: ['father', 'mother', 'phone', 'address', 'religion', 'occupation', 'email']
            }],
            where: {id: id}})
        if(!response){
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

const classPromotion = async(req, res) => {
    const {id, currentClass, promotionClass } = req.body;
    try{
        const checkStudent = await student.findOne({where:{id: id, class: currentClass}})
        if(!checkStudent){
           return res.status(404).json({
                error: "Student Not Found"
            })
        }
        if(Number(promotionClass) <= checkStudent.class){
            return  res.status(400).json({
                error: "Cant get demoted"
            })
        }

        const update = await student.update({
                class: promotionClass
            },
            {
                where: {
                    id: id
                }
            })

            if(!update){
                return res.status(500).json({
                    error: "Update was not successfull"
                })
            }

            res.status(200).json({
                error: "Update was successfull"
            })
        }
    catch(error){
        return res.status(500).json({
            message: "An error occured while promoting the student",
            error: error.message
        })
    }
}

module.exports = {
    createStudent,
    getAllStudent,
    getStudentById,
    classPromotion
}
