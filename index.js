const express = require("express");
const db = require("./modules/index")
const bcrypt = require("bcrypt")
const app = express();
const cors = require('cors')

db.sequelize.sync({ force: 0});

app.use(cors({
    origin: "*"
}))   


// Built-in middleware functions for parsing request bodies
// Using these middlewares ensures that your Express application can handle and parse both JSON and URL-encoded data from incoming requests.
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads parse the form data


const authRouter = require("./routes/auth")
app.use('/auth', authRouter)


const createUser = async (req, res) => {
    const findAdmin = await db.users.findOne({ where: { role: "admin" } })
    if (!findAdmin) {
        const hashpassword = await bcrypt.hash("password", 8);
        await db.users.create({
            email: "admin@gmail.com",
            password: hashpassword,
            role: "admin"
        })

        await db.profile.create({
            email: email
            });

        console.log("Admin is created successfully")
    } else {
        console.log("Admin is already seeded")
    }
}

createUser()


const portNumber = 3001;

app.listen(portNumber, () => console.log("Server has started in the port " + portNumber))