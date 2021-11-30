var express = require('express');
var router = express.Router();
const {requireSignin} = require('../middlewares/index')


const {register,login,getCurrentUser,logout,myposts} = require('../controllers/auth')

router.post('/register',register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/getcurrentuser', requireSignin , getCurrentUser)
router.get('/mypost', requireSignin, myposts)

module.exports = router;
