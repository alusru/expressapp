const expressJwt = require('express-jwt');


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
