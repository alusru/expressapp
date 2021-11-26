const User = require( '../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



/**
 *
 * @param password
 * @returns {Promise<unknown>}
 */
const encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err,salt)=> {
            if(err){
                reject(err)
            }
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err){
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

/**
 *
 * @param password
 * @param encryptPassword
 * @returns {void|Promise<never>|Promise<unknown>|*}
 */
const passwordCompare = (password,encryptPassword) => {
    return bcrypt.compare(password,encryptPassword)
}

/**
 *
 * @param request
 * @param response
 * @returns {Promise<*>}
 */
const register = async (request,response) => {
        try{

          const {email, password} = request.body

          if(!email) return response.status(400).send('Email is required')

           if(password.length < 6 ) return response.status(400).send('Password is less than 6 characters')

          if(!password) return response.status(400).send('Password is required')

          let userCheckExist = await User.findOne({email}).exec()

          if(userCheckExist) return response.status(400).send('Email already exists')


           const encryptedHash = await  encryptPassword(password)



         const user = await new User({
             email,
             password: encryptedHash
         }).save()
         response.status(200).send(`user ${email} has been registered`)


        }catch (e) {
            return response.status(400).send('Not Registered')
        }
}

/**
 *
 * @param request
 * @param response
 * @returns {Promise<*>}
 */
const login = async (request,response) => {
    try {
        const {email,password} = request.body

        const findUser = await User.findOne({email}).exec()

        const passwordComparedWithDB = await passwordCompare(password,findUser.password)

        if(!passwordComparedWithDB || !findUser) return response.status(400).send('username / password is incorrect')


        const token = jwt.sign({_id:findUser._id}, process.env.JWT_SECRET_KEY,{
            expiresIn: "7d",
        })

        findUser.password = undefined

        response.cookie("token",token,{
            httpOnly:true
        })


        return response.json({message: "Login Successful"})


    }catch (e) {
        response.status(400).send('Cannot login at this time')
    }
}

/**
 *
 * @param request
 * @param response
 */
const getCurrentUser = async (request,response) => {
    try{
        const currentUser = await User.findById(request.user._id).select("-password").exec()
        response.status(200).send(`${currentUser}`)
        return response.json({status: true})
    }catch (e) {
        response.status(400).send(e)
    }
}

const logout = async (request,response) => {
    try{
        response.clearCookie("token");
        return response.json({message: "Logout Successfully"});
    }catch (e) {
        console.log(e)
    }
}


module.exports = {register,login,getCurrentUser,logout}
