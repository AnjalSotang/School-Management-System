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

        res.json(parentData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parents' });
    }
};

module.exports = {
    getParents
}
