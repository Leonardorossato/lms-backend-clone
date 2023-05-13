const jwt = require("jsonwebtoken");
require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET

const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret)
}

module.exports = generateToken