const jwt = require('jsonwebtoken');

//This is middleware function which we can add into any routes that we want ...
//we dont want to give user access without JWT....
module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied !!!! MFFF');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err) {
        res.status(400).send('Invalid Token');
    }
}


