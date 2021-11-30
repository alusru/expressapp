const mongoose = require( 'mongoose')

const {ObjectId} = mongoose.Schema;
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 300,
        required: true,
    },
    slug: {
        type: String,
        lowercase: true
    },
    description: {
        type: {},
        minlength: 200,
    },
    category: {
        type: String
    },
    published: {
        type: Boolean,
        default: false
    },
    author: {
        type: ObjectId,
        ref: "User",
        required: false
    }
},{timestamps:true})


module.exports = mongoose.model("Post",PostSchema)
