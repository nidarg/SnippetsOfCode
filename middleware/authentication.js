const jwt = require('jsonwebtoken')
const User = require('../models/User')

const {UnauthenticatedError} = require('../errors')

const authenticationMiddleware = async(req,res,next)=>{
    if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication Invalid')
    }

    const token = req.headers.authorization.split(' ')[1]

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.userId).select('-password')
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
}

module.exports = authenticationMiddleware