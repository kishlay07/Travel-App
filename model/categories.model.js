const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
     
    
    category: {type: String , required : true},
    
})


const categories = mongoose.model("categories" , categoriesSchema);

module.exports = categories;