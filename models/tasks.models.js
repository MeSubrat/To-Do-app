//Core modules
const fs = require('fs');
const path = require('path');

//Local Module
const rootDir = require('../utils/pathUtils');

const tasksPath = path.join(rootDir,'data','tasks.json')

module.exports = class Task{
    constructor(title,description){
        this.title = title;
        this.description = description;
        // this.taskId = taskId
    }

    save(){
        Task.fetchAll(tasks=>{
            if(this.id){
                const foundTask = tasks.find(task=>task.id===this.id);
                if(foundTask) {
                    foundTask.title = this.title;
                    foundTask.description = this.description;
                }
                // tasks = tasks.map(task=>task.id.toString()===this.id?this:task);
            }
            else{
                this.id = Math.random().toString();
                tasks.push(this);
            }
            fs.writeFile(tasksPath,JSON.stringify(tasks),errors=>{
                console.log('File writing concluded!',errors);
            })
        })
    }
    static fetchAll(callback){
        fs.readFile(tasksPath,'utf8',(err,data)=>{
            // callback(!err? JSON.parse(data):[])
            if(err){
                callback([]);
                return;
            }
            try {
                const tasks = data.trim()==='' ? [] : JSON.parse(data);
                callback(tasks);
            } catch (error) {
                console.log('JSON parse error',error)
            }
        });
    }
    static fetchById(taskId,callback){
        Task.fetchAll((tasks)=>{
            const foundTask = tasks.find(task=>task.id.toString()===taskId);
            callback(foundTask);
        })
    }
    static deleteById(taskId,callback){
        this.fetchAll(tasks=>{
            tasks = tasks.filter(task => task.id!==taskId);
            fs.writeFile(tasksPath,JSON.stringify(tasks),errors=>{
                console.log('File writing concluded!',errors);
            })
            callback(true);
        })
    }
}

