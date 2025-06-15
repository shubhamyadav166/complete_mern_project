// Step 5
require('dotenv').config();
const mongoose = require('mongoose')

const URI = "mongodb+srv://shubhamyadav:shubhamyadav@cluster0.o0m0y.mongodb.net/REAL_DATA_IN?"

// const URI = process.env.URI

// Connection With Mongodb  Community 
//const URI = "mongodb://127.0.0.1:27017/new_db_store"

const connectDb = async () => {
    try {
        await mongoose.connect(URI)
        console.log("connection successfull")
    } catch (error) {
        console.log('connection faild')
        process.exit(0)
    }
}
module.exports = connectDb 