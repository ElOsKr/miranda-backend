import mongoose from "mongoose";
const { Schema } = mongoose;
import { ContactsType } from '@src/@types/contactType'

const contactSchema = new Schema<ContactsType>({
    id: {type: String, unique: true},
    customer: {
        name: String,
        email: String,
        phone: Number
    },
    subject: String,
    comment: String,
    status: Boolean
})

export const contactModel = mongoose.model('Contacts', contactSchema)