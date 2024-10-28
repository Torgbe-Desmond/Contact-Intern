const { StatusCodes } = require('http-status-codes');
const Contact = require('../models/contact');
const { NotFound } = require('../errors/error');


const updateContact = async (req,res)=>{
    const { name, description, email, mobile } = req.body;
    const { id } = req.params;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const contactExist = await Contact.find({id});
        if(!contactExist){
            NotFound.setMessage(`There is no contact with id ${id}`);
        }
        const contactObject = {};
        if(name){
            contactObject.name = name
        }
        if(description){
            contactObject.description = description
        }
        if(email){
            contactObject.email = email
        }
        if(mobile){
            contactObject.mobile = mobile
        }
        const updateContact = await Contact.findByIdAndUpdate(id,{contactObject},{session});
        await session.commitTransaction(); 
        res.status(StatusCodes.OK).json(updateContact);
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

module.exports = updateContact