require('dotenv').config();
const {sign, verify} = require('jsonwebtoken')

const createToken = (user) => {
    const accessToken = sign({email: user.email}, process.env.JWT_SECRET);
    return accessToken;    
    
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies['access-token'];
    if (!accessToken) 
    return res.status(401).json({error: "User not authenticated"});
    try {
        const validToken = verify(accessToken, process.env.JWT_SECRET)
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    } catch(err) {
        return res.status(400).json({error: err});
    }
};

module.exports = {createToken, validateToken};