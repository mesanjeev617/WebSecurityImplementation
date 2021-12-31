const router = require('express').Router();
const verify = require('./privateRoutes')

router.get('/',verify ,(req, res)=> {
    //yaha baata user laai ni lyaauna sakinxa 
    //use this insated of rest in this function
    //res.send(req.user);
    res.json({posts: {
        title: 'my first post',
        description: 'random data that you shouldnot be accessing without my permission...',
        
    }})
})




module.exports = router;