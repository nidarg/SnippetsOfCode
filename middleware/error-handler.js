
// const {CustomAPIError} = require('../errors')
const {StatusCodes} = require('http-status-codes')

const errorHandlerMiddleware = (err,req,res,next)=>{
    // handle mongoose error user friendly
    let customError = {
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message || 'Something went wrong'
    }
    // if(err instanceof CustomAPIError){
    //     return res.status(err.statusCode).json({msg:err.message})
    // }

    //cast error when id params is more or less chars
    if(err.name === 'CastError'){
        customError.msg = `No item with id ${err.value}`
        customError.statusCode = 404
    }

    // auth errors
    if(err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors).map(item=>item.message).join(',')
        customError.statusCode = 400
    }

    // duplicate email
    if(err.code && err.code === 11000){
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field,please choose other value`
    }   customError.statusCode = 400


    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
    return res.status(customError.statusCode).json({msg:customError.msg})
}

module.exports = errorHandlerMiddleware