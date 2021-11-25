const Task = require('../models/Task')
const postTasks = async (request,response,next) => {
    try{
        const task = await Task.create(request.body)
        response.status(200).json({task})
    }catch (e) {
        response.status(500).json({message: e})
    }

}
const getAllTasks = async (request,response,next) => {
    try{
        const tasks = await Task.find({})
        response.status(200).json({tasks})
    }catch (e) {
        console.log(e)
    }
    response.status(200).send('all tasks')
}
const getOneTask = async (request,response,next) => {
    try{
        const {id:taskID} = request.params
        const findOne = await Task.findOne({ _id: taskID })

        if(!findOne){
            return response.status(404).json({message:`No task with id : ${taskID}`})
        }

        response.status(200).json({findOne})
    }catch (e) {
        response.status(500).json({message: e})
    }

}
const updateOneTask = async (request,response,next) => {
    try{
        const {id:taskID} = request.params

        const task = await Task.findOneAndUpdate({_id:taskID},request.body,{
            new:true,
            runValidators: true
        })

        if(!task){
            return response.status(404).json({message:`No task with id : ${taskID}`})
        }
        response.status(200).json({task})

         response.status(200).json({id:taskID,data:request.body})
    }catch (e) {
        response.status(500).json({message: e})
    }
    response.status(200).send('update a task')
}

const deleteOneTask = async (request,response,next) => {
    try{
        const {id:taskID} = request.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if(!task){
            return response.status(404).json({message:`No task with id : ${taskID}`})
        }
        response.status(200).json({task})
    }catch (e) {
        response.status(500).json({message: e})
    }
    response.status(200).send('delete a task')
}
module.exports = {getAllTasks,postTasks,getOneTask,updateOneTask,deleteOneTask};
