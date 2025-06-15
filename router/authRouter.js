// steps 3.
const express = require('express')
const router = express.Router()
// Steps 4
const authcontroller = require('../controllers/authController')

router.route("/").get(authcontroller.home)

router.route("/registration").post(authcontroller.registration)
router.route("/login").post(authcontroller.login)

module.exports = router