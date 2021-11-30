const Post = require('../models/Post')

//https://www.npmjs.com/package/slugify
const slugify = require('slugify')





const createPost = async (request,response) => {
    try{
        const postExist = await Post.findOne({
            slug: slugify(request.body.title.toLowerCase()),
        })

        if(postExist) return response.status(400).send("use a different post title")

        const post = await new Post({
            slug: slugify(request.body.title),
            author: request.user._id,
            ...request.body
        }).save()

        response.json(post)
    }catch (e) {
        console.log(e)
        return response.status(400).send('Cannot create a post')
    }
}

module.exports = {createPost}
