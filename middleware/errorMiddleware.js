const { StatusCodes } = require("http-status-codes")


const errorMiddleware = (err,req,res,next)=>{

    const errorObject = {
        message:err.message || 'INTERNAL SERVER ERROR',
        statusCode :err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    }

    res.statusCode(errorObject.statusCode).json({message:errorObject.message});
    next();
}

module.exports = errorMiddleware;