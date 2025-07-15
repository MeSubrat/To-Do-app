const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type: String,
        require: true
    }
})

const todo = mongoose.model('todo',todoSchema);
module.exports = todo;
