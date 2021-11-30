const expressJwt = require('express-jwt');
const User = require('../models/User');

/**
 *
 * @type {(function(*=, *=, *): (*|undefined))|*}
 */
 const requireSignin = expressJwt({
    getToken: (request,response) => request.cookies.token,
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ["HS256"]
})

/**
 *
 * @param request
 * @param response
 * @param next
 * @returns {Promise<*>}
 */
const verifiedUser = async (request, response,next) => {
     try{
         const user = await User.findById(request.user._id).exec();

         if(!user.role.includes("author")) {

             return response.sendStatus(403)

         }else{
             next();
         }

     }catch (e) {
         console.log(e)
     }
}

module.exports = {requireSignin,verifiedUser}
