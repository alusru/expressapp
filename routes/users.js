var express = require('express');
var router = express.Router();
const {requireSignin} = require('../middlewares/index')


const {register,login,getCurrentUser} = require('../controllers/auth')

router.post('/register',register)
router.post('/login', login)
router.post('/getcurrentuser', requireSignin , getCurrentUser)

module.exports = router;
