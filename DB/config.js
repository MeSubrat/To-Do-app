const mongoose = require('mongoose');
const URI = process.env.MONGO_URI;


const connectDb = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://MeSubrat:Subrat%402025@cluster0.2pxte.mongodb.net/TodoDb');
        console.log('Mongodb Connected!')
    } catch (error) {
        console.log('MongoDB connection failed!',error);
        process.exit(1);
    }
}
module.exports = connectDb;