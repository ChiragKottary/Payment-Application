const JWT_SECRET = require('./config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{

    const authHeader = req.headers.authorization;

    // if(!authHeader || !authHeader.startsWith('Bearer ')){
    //     return res.status(403).json({
    //         message : "not auth1"
    //     });
    // }

    const token = authHeader;

    const decoded = jwt.verify(token,JWT_SECRET);

    if(decoded.userID)
    {
        req.userID = decoded.userID;
        next();
    }
    else{
        return res.status(403).json({
            message : "not auth2"
        });
    }

}

module.exports = authMiddleware;