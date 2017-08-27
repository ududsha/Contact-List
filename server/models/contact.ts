import * as mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: Number,
    emailAddress: String
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
