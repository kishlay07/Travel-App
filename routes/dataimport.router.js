const express = require('express');  //import express

const Hotel = require('../model/hotel.model');
const hotels = require('../data/hotels');

const router = express.Router();

router.route("/").post(async (req,res) => {

    try{
     await Hotel.remove();
     const hotelInDB = await Hotel.insertMany(hotels.data);
     res.json(hotelInDB); 
    }catch(err){
        console.log(err);
        res.json({message : "Could not able to add data"})
    }
     
})

module.exports = router