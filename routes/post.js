var express = require('express');
var router = express.Router();
const {requireSignin,verifiedUser} = require('../middlewares/index');


const {createPost} = require('../controllers/post')


router.post('/post', requireSignin ,verifiedUser, createPost)

module.exports = router;
