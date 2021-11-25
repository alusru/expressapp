
const mongoose = require('mongoose')
/**
 *
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}>}
 */
const TaskSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true,'must provide a name'],
        trim: true,
        maxlength: [20, 'cannot be long than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task',TaskSchema)
