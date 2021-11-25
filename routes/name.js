var express = require('express');
var router = express.Router();
var {getName} = require('../controllers/name');


router.get('/', getName);

module.exports = router;
