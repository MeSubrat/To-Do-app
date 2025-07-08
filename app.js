//Core Module
const path = require('path');

//Ext module
const express = require('express');

const rootDir = require('./utils/pathUtils');
const taskRouter = require('./routes/tasksRouter');
const { pageNotFound } = require('./controllers/errorController');

const app = express();
app.set('view engine','ejs');
app.set('views','views');

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(rootDir,'public')));
app.use((req,res,next)=>{
    console.log(req.method,req.url);
    next();
});
app.use(taskRouter)
app.use(pageNotFound);


const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

