var express = require('express');
var router = express.Router();
const {requireSignin} = require('../middlewares/index')


const {register,login,getCurrentUser,logout} = require('../controllers/auth')

router.post('/register',register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/getcurrentuser', requireSignin , getCurrentUser)

module.exports = router;
