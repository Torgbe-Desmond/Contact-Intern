const router = require('express').Router();
const createContact = require('../controllers/createContact');
const getAllContact = require('../controllers/getAllContact');
const getContact = require('../controllers/getContact');
const updateContact = require('../controllers/updateContact');

router.route('/').post(createContact).get(getAllContact);

router.route('/:id').get(getContact).put(updateContact);

module.exports = router;