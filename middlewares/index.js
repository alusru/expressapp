const expressJwt = require('express-jwt');
require('dotenv').config()

/**
 *
 * @type {(function(*=, *=, *): (*|undefined))|*}
 */
 const requireSignin = expressJwt({
    getToken: (request,response) => request.cookies.token,
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ["HS256"]
})

module.exports = {requireSignin}
