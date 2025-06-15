const bcrypt = require("bcryptjs");
// step 6
const User = require('../models/user-model')

// Step 5
const home = (req, res) => {
    try {
        res.status(200).send("we are at home page")
    } catch (error) {
        console.log("home page is not rendering: ", error)
    }
}
const registration = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // if user already exist
        const existinguser = await User.findOne({ email })
        if (existinguser) {
            return res.status(400).json({ message: "user already exist " })
        }

        // 🔐 Hash password
        const saltRound = 10
        const hashedPassword = await bcrypt.hash(password, saltRound);
        const userCreate = User.create({
            username,
            email,
            password: hashedPassword
        })
        res.status(200).json({ message: "Rrgistration successful", Token: await userCreate.generateToken(), userid: userCreate._id.toString() })
        userCreate.save()

    } catch (error) {
        res.status(500).send({ message: "server error" })
    }
}


//*********************
// LOGIN
//  */

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credential" })
        }

        // const user = await bcrypt.compare(password, userExist.password)
        //this function is called from userSchema model
        const user = await userExist.comparePassword(password)

        if (user) {
            res.status(200).json({ message: "Login Successfull", Token: await userExist.generateToken(), userid: userExist._id.toString() })

        } else {
            res.status(401).json({ message: "Invalid Email and Password" })
        }
    } catch (error) {
        res.status(500).send({ message: "server Error" })
    }


}
module.exports = { home, registration, login }