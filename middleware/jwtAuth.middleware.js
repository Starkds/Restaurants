require('dotenv').config()
const jwt = require('jsonwebtoken');



const jwtAuthToken = (req,res, next) =>{
    
    const authorization = req.headers.authorization;
    
    if(!authorization)  return res.status(401).json({error:"Token not found"});

    const token = authorization.split(' ')[1];
              
    if(!token) return res.status(401).json({message:"unauthorized"});

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user =decodedData;
      next();

    } catch (error) {
        console.log(error);
        res.status(401).json({error:"invalid token"});
    }

}

//function to generate token

const generateToken = (userData) =>{
    return jwt.sign(userData, process.env.JWT_SECRET_KEY , {expiresIn:30000});
}




module.exports = {
    jwtAuthToken,
    generateToken
} 