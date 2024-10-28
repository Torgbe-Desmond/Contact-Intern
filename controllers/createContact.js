const { StatusCodes } = require('http-status-codes');
const Contact = require('../models/contact');
const mongoose = require('mongoose');
const { BadRequest } = require('../errors/error');

const createContact = async(req,res)=>{

    const session = await mongoose.startSession();
    session.startTransaction();
    const { name, email, description,mobile } = req.body;
    try {
        const contactExist = await Contact.findOne({email});
        if(contactExist){
            BadRequest.setMessage('Contact already exists.');
        }
        const newContact = await Contact.create([
            {
                name,
                email,
                description,
                mobile
            }
        ],{session});
        await session.commitTransaction(); 
        res.status(StatusCodes.CREATED).json(newContact)
    } catch (error) {
        await session.abortTransaction()
        throw error;
    } finally {
        session.endSession()
    }

}


module.exports = createContact
