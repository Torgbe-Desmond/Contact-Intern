const { StatusCodes } = require('http-status-codes');
const Contact = require('../models/contact');
const { NotFound } = require('../errors/error');


const deleteContact = async (req,res)=>{
    const { id } = req.params;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const contactExist = await Contact.find({id});
        if(!contactExist){
            NotFound.setMessage(`There is no contact with id ${id}.`);
        }
        const deleteContact = await Contact.findByIdAndDelete(id,{session});
        await session.commitTransaction(); 
        res.status(StatusCodes.OK).json(deleteContact);
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

module.exports = deleteContact