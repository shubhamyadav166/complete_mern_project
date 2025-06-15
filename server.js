
// Step 1.
const express = require("express")
const app = express()

// Step 3.
const router = require('./router/authRouter')
// database connection
const connectDb = require('./utils/db')

app.use(express.json())
//  Step 2. database connection
connectDb()
app.use('/api/auth', router)

const port = 6090

app.listen(port, () => console.log(`Server in listennig on port ${port}`))