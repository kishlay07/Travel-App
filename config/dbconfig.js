const mongoose = require('mongoose');
const dotenv = require('dotenv');

//loads the variable from .env into process.env
dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI , {
        })
    }catch(err){
        console.log(err);
    }

}

module.exports = connectDB;