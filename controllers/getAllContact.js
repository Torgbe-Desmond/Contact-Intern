const { StatusCodes } = require('http-status-codes');
const Contact = require('../models/contact');


const getAllContact = async(req,res)=>{
    const allContacts = await Contact.find();
    res.status(StatusCodes.OK).json(allContacts);
}

module.exports =getAllContact;