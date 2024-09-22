const { parent } = require("../modules");

const getParents = async (req, res) => {
    try {
        const parents = await parent.findAll();
        
        // Map through parents to create separate entries for father and mother
        const parentData = parents.flatMap(parent => [
            {
                name: parent.father,
                gender: 'Male',
                email: parent.email,
                phone: parent.phone,
                occupation: parent.occupation,
                address: parent.address,
                religion: parent.religion
            },
            {
                name: parent.mother,
                gender: 'Female',
                email: parent.email,
                phone: parent.phone,
                occupation: parent.occupation,
                address: parent.address,
                religion: parent.religion
            }
        ]);

        res.status(200).json({nessage: parentData});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parents' });
    }
};

// const getParents = async (req, res) => {
//     try {
//         const { page = 1, size = 10, name } = req.query;
//         const { limit, offset } = getPagination(page, size);

//         // Build the search condition for the name
//         const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

//         // Log the condition to check the query
//         console.log('Condition:', condition);

//         const parents = await parent.findAndCountAll({
//             where: condition,
//             offset: offset,
//             limit: limit,
//         });

//         // Log the result to check if data is fetched
//         console.log('Parents:', parents);

//         const response = parents.rows.flatMap(parent => [
//             {
//                 id: parent.id,
//                 name: parent.father,
//                 gender: 'Male',
//                 occupation: parent.occupation,
//                 email: parent.email,
//                 phone: parent.phone,
//                 address: parent.address,
//             },
//             {
//                 id: parent.id,
//                 name: parent.mother,
//                 gender: 'Female',
//                 occupation: parent.occupation,
//                 email: parent.email,
//                 phone: parent.phone,
//                 address: parent.address,
//             }
//         ]);

//         const pagingData = getPagingData(
//             { count: response.length, rows: response },
//             page,
//             limit
//         );

//         res.status(200).json({ successful: pagingData });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Error fetching parents' });
//     }
// };


module.exports = {
    getParents
}
