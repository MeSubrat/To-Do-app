//Core Module
const path = require('path');

//Local Module
// const rootDir = require('../utils/pathUtils');
// const Task = require('../models/tasks.models');
const todo = require('../models/todoModels');
const { render } = require('ejs');


// const tasks = [];

exports.getHome = ((req,res,next)=>{
    // res.sendFile(path.join(rootDir,'views','home.html'));
    res.render('home');
})

exports.getAlltasks = (async (req,res,next)=>{
    // res.sendFile(path.join(rootDir,'views','all-tasks.ejs'));
    // const { title, description } = req.body;
    // Task.fetchAll(tasks=>{
    //     // console.log(tasks);
    //     res.render('all-tasks',{tasks:tasks});
    // })
    let data = await todo.find();
    res.render('all-tasks',{tasks:data});
    // console.log('Received from find()',data);
})

exports.getAddTask = ((req,res,next)=>{
    // res.sendFile(path.join(rootDir,'views','edit-task'));
    const editing = req.query.editing==='true';
    // Task.fetchById(taskId,task=>{
    //     if(!task){
    //         console.log('Task not found!');
    //         res.redirect('/all-tasks');
    //     }
    //     else{
    //         res.render('edit-task',{
    //             editing:editing,
    //             task:task
    //         });
    //     }
    res.render('edit-task',{
        editing:editing,
        taskId:null
    });
    
})

exports.postAddTask = (async(req,res,next)=>{
    // console.log(req.body);
    // tasks.push({ title:req.body.title, description:req.body.description });
    // // tasks.push({title,description})
    // res.sendFile(path.join(rootDir,'views','task-added.html'));
    // const {title,description} = req.body;
    // const task = new Task(title,description);

    // task.save();
    // // console.log(title,description);
    // res.sendFile(path.join(rootDir,'views','task-added.html'));

    const data = await todo.insertOne(req.body);
    // res.send(data);
    console.log('Todo inserted!',data);
    res.render('task-added');
})


exports.getEditTask = (async(req,res,next)=>{
    const taskId = req.params.taskId;
    const editing = req.query.editing==='true';
    // console.log('Id is ',taskId);

    // Task.fetchById(taskId,task=>{
    //     if(!task){
    //         console.log('Task not found!');
    //         res.redirect('/all-tasks');
    //     }
    //     console.log('Task Found:',task);
    //     res.render('edit-task',{
    //         editing:editing,
    //         task:task,
    //         taskId:taskId
    //     });
    // })
    let data = await todo.findById(taskId);
    // console.log('from getEdit task',data);
    if(!data){
        console.log('Task not found!');
        res.redirect('/all-tasks');
    }
    else{
        res.render('edit-task',{
            editing,
            task:data,
            taskId
        })
    }
})

exports.postEditTask = (async (req,res,next)=>{
    const {taskId} = req.body;
    // console.log('Id is ',taskId);
    // Task.fetchById(taskId,task=>{
    //     if(!task){
    //         console.log('Task not found!!');
    //     }
    //     else{
    //         const task = new Task(title,description);
    //         task.id = taskId;
    //         task.save();
    //         console.log('Update Successfull');
    //     }
    //     res.redirect('/all-tasks');
    // })

    await todo.updateOne(
        {_id:taskId},
        {
            $set:req.body
        }
    )
    console.log('Update Successfull');
    res.redirect('/all-tasks');
    // if(!data){
    //     console.log('Data not found');
    // }else{
    //     res.render('edit-task',{
    //         editing:req.params.editing,
    //         task:data,
    //         taskId
    //     })
    // }
    
})

exports.getDeleteTask = (async (req,res,next)=>{
    const taskId = req.params.taskId;
    // console.log('Task id is :',taskId);

    // Task.deleteById(taskId,callback=>{
    //     if(callback){
    //         console.log('Task deleted successfully!!');
    //     }
    //     else{
    //         console.log('Task deletion failed!');
    //     }
    //     res.redirect('/all-tasks');
    // })
    await todo.deleteOne({_id:taskId});
    res.redirect('/all-tasks');
})