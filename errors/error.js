const {StatusCodes} = require('http-status-codes')


const errorObject = {
    statusCode:null,
    setMessage: function setMessage(message){
        this.message = message;
    },
    setStatusCode: function setStatusCode(statusCode){
        this.statusCode = statusCode;
    }
};

Object.setPrototypeOf(errorObject, Error);

const BadRequest = Object.create(errorObject);
BadRequest.setStatusCode = StatusCodes.BAD_REQUEST;

const NotFound  = Object.create(errorObject);
NotFound.setStatusCode = StatusCodes.NOT_FOUND;

module.exports = {
    BadRequest,
    NotFound,
}