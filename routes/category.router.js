const express = require('express');  //import express
const router = express.Router();
const Category = require('../model/categories.model');


router.route("/").get(async (req , res)=> {
    try {
        const categories = await Category.find({});
        res.json(categories); 
    } catch (error) {
        res.status(404).json({message : "Could not find categories"});
        
    }
})

module.exports = router;
