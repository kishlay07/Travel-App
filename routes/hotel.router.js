const express = require('express');
const hotels = require('../data/hotels');
const Hotel = require('../model/hotel.model');

const router = express.Router();

router.route("/").get(async (req ,res ) => {
   //Request of searching hotel by catogery
   const hotelCatogery = await req.query.category;
     try {
      let hotels;
      
      if (hotelCatogery){
           hotels = await Hotel.find({category : hotelCatogery})    //finding hotel by catogery
      }else{
          hotels = await Hotel.find({});
      }
        
        hotels ? res.json(hotels) : res.status(404).json({message : "No data Found"})
     } catch (err) {

        console.log(err);
        
        
     }   
})


module.exports = router;