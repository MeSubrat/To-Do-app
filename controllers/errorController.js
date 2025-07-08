//Core Module
const path = require('path');
//Local Module
const rootDir = require('../utils/pathUtils');
exports.pageNotFound = (req,res,next)=>{
    res.render(path.join(rootDir,'views','404.ejs'))
}