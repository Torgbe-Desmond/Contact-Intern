const { StatusCodes } = require('http-status-codes');
const Contact = require('../models/contact');
const { NotFound } = require('../errors/error');


const getContact = async (req,res)=>{
    const {id} = req.params;
    try {
        const contactExist = await Contact.findById(id);
        if(!contactExist){
            NotFound.setMessage(`There is no contact with id ${id}.`);
        }
        res.status(StatusCodes.OK).json(contactExist);
    } catch (error) {
        throw error;
    }
}   

module.exports = getContact