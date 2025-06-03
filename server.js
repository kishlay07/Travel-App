const express = require('express');  //import express
const mongoose = require('mongoose');


const hotelRouter = require("./routes/hotel.router");
const connectDB = require('./config/dbconfig')
const hotelDataAddedToDBRouter = require("./routes/dataimport.router")
const categoriesDataAddedToDBRouter = require("./routes/categoriesimport.router")
const categoryRouter = require("./routes/category.router");
const singleHotelRouter = require("./routes/singlehole.router");
const authRouter = require("./routes/auth.router");



const app = express();               //create express app which handles requests and responses

const PORT = 3500;                  //Set default port to 3500 (where server will run)

//its help express to understand json file
app.use(express.json());
connectDB();  //connection with DB


//When someone visits the home page server responds with "Hey Nandini"
app.get('/' , (req , res) => {
    res.send("Hey Nandini");
});

app.use("/api/category" , categoryRouter);
app.use("/api/categorydata", categoriesDataAddedToDBRouter)
app.use("/api/hoteldata" , hotelDataAddedToDBRouter);
app.use("/api/hotels" , singleHotelRouter);
app.use("/api/auth",authRouter);
//when someone visits https://localhost:3500/api/hotels  they will see the value routs in hotelRouters
app.use("/api/hotels" , hotelRouter)


//Start the server on port 3500 once connection to DB is completed. 
mongoose.connection.once("open", () => {
    console.log("Connected to DB");
    //Tells the app to start the server
app.listen(process.env.PORT || PORT , () => {
    console.log("Server is Up and Running");
})
})




