const express = require('express');
const { getHome, getAlltasks, getAddTask, postAddTask, getEditTask, postEditTask, getDeleteTask } = require('../controllers/taskController');
const taskRouter = express.Router();

taskRouter.get('/',getHome);
taskRouter.get('/all-tasks',getAlltasks);
taskRouter.get('/add-task',getAddTask);
taskRouter.post('/add-task',postAddTask);
taskRouter.get('/edit-task/:taskId',getEditTask);
taskRouter.post('/edit-task',postEditTask);
taskRouter.get('/delete-task/:taskId',getDeleteTask);

// exports.taskRouter = taskRouter;
module.exports = taskRouter;