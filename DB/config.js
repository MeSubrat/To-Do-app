const mongoose = require('mongoose');
require('dotenv').config();
const URI = process.env.MONGO_URI;


const connectDb = async ()=>{
    try {
        await mongoose.connect(URI);
        console.log('Mongodb Connected!')
    } catch (error) {
        console.log('MongoDB connection failed!',error);
        process.exit(1);
    }
}
module.exports = connectDb;