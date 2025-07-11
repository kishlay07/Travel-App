const express = require('express');  //import express

const Category = require('../model/categories.model');
const categories = require('../data/categories');

const router = express.Router();

router.route("/").post(async (req,res) => {

    try{
      // await Category.remove();
     const categoriesInDB = await Category.insertMany(categories.data);
     res.json(categoriesInDB); 
    }catch(err){
        console.log(err);
        res.json({message : "Could not able to add categories"})
    }
     
})

module.exports = router