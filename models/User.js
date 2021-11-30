const mongoose = require( 'mongoose')
const {Schema} = mongoose

/**
 *
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}>}
 */
const SchemaUser = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        min: 6,
        max: 65,
    },
    role: {
        type: String,
        default: "author"
    }

},{timestamps: true})


module.exports = mongoose.model('User',SchemaUser)
