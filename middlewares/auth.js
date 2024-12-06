const jwt = require('jsonwebtoken')
exports.authMiddleware = (req, res, next) => {  
    if (req.headers['authorization']) {
        let token = req.headers['authorization']
        token = token.replace( /^Bearer\s+/ , "")
       

        try{
            let decodedToken = jwt.verify(token , process.env.SECRET)
            req.auth = decodedToken
            return next()
        }catch(err){
           
            res.status(403).send({message : 'Invalid token'})
        }
       
    } else {
        res.status(403).send({message : 'Token required'})
    }
}