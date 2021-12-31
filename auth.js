const router = require('express').Router();
const User = require('../models/User');
const userModel = require('../models/User')
const bcrypt = require('bcryptjs')
const {registerValidation, loginValidation} = require('../validation'); //how to do multiple imports 
const { invalid } = require('@hapi/joi');
//Importing JWT
const jwt = require('jsonwebtoken')



router.post('/register', async (req, res)=> {
    //Validating the data before posting to the database....and make a user
    //{error} lekhyo vane yeslai retrive garna sakinxa muni
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //checking if the user is already in the database 
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('Email already exists')

    //Hash the password 
    //Generate salt 
    const salt = await bcrypt.genSalt(10); //10 complexity of the string ....
    //I guess 10 characters 
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //output is salt + hashed 

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })

    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }

});

//LOGIN...
router.post('/login', async (req, res)=>{
    //Validating the data before posting to the database....and make a user
    //{error} lekhyo vane yeslai retrive garna sakinxa muni
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //checking if the user is already in the database 
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email wasnot found, please sign up.....')

    //password is correct.....
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password....')

    //JWT
    //create and assign token
    //token secret is in dotenv...
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token);
    res.send('Logged Innnnn......')
})

//How to create private routes with JWT.....

module.exports = router;