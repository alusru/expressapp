var express = require('express');
var router = express.Router();
var {getAllTasks,postTasks,getOneTask,updateOneTask,deleteOneTask} = require('../controllers/tasks')


router.get('/', getAllTasks) // get all tasks

router.post('/' ,postTasks) // post a task
router.get('/:id',getOneTask) // get one task
router.patch('/:id',updateOneTask) // update one task
router.delete('/:id',deleteOneTask) // delete one task



module.exports = router;
