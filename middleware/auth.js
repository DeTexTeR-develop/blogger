const {verifyToken} = require('detexter-auth-kit');

function verifyTokenByCookie (cookie){
    return ( req, res, next) => {
        const tokenCookieValue = req.cookies[cookie];
        if(!tokenCookieValue){
            return next();
        };
        try{
            const userPayload = verifyToken(tokenCookieValue, process.env.JWT_SECRET);
            req.user = userPayload;
            next();
        }catch (err) {
            console.log("Invalid token:", err.message);
            return next();
        }
    }
};


module.exports = {verifyTokenByCookie};