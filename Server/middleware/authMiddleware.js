const jwt = require('jsonwebtoken')

const tokenVerify = (req, res, next)=>{
  try {
    const reqHeader = req.header("Authorization")
    const token = reqHeader
    if(!token){
      res.status(400).json({message: "Invalid token"})
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY)
   req.body.userId = decode.userId
    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = tokenVerify