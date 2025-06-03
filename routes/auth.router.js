const express = require('express');
const cryptojs = require('crypto-js');
const router = express.Router();
const User = require("../model/user.model")
const jwttoken = require("jsonwebtoken")

//User Resister 
router.route("/register").post(async (req, res) => {


    try {
        const userObject = {
            username: req.body.username,
            number: req.body.number,
            email: req.body.email,
            password: cryptojs.AES.encrypt(req.body.password,process.env.PASSWORD_SECRET_KEY).toString()
        }

        const newUser = new User(userObject);
        const saveUser = await newUser.save();  //use to save user in DB

        res.status(201).json(saveUser);
    } catch (error) {
        res.status(500).json({ massage: "Error creating a user" });
    }

})


router.route("/login").post(async(req,res)=>{
    //Check for number is present in DB or not
    const user = await User.findOne({number : req.body.number});
    !user && res.status(401).json({massage : "Incorrect Mobile number"});
    //decode password of DB with that user
    const decodedPassword = cryptojs.AES.decrypt(user.password ,process.env.PASSWORD_SECRET_KEY).toString(cryptojs.enc.Utf8)
    console.log(decodedPassword);
    decodedPassword !== req.body.password && res.status(401).json({massage : "Incorect Password"});
    
    const accessToken = jwttoken.sign({username : user.username},process.env.ACCESS_TOKEN)
    const {password, ...rest} = user._doc;


    res.json({...rest,accessToken});


})

module.exports = router;