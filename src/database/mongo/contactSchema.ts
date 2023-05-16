import mongoose from "mongoose";
const { Schema } = mongoose;
import { ContactsType } from '@src/@types/contactType'

export const contactSchema = new Schema<ContactsType>({
    id: {type: String, unique: true},
    customer: [{
        name: String,
        email: String,
        phone: Number
    }],
    subject: String,
    comment: String,
    status: Boolean
})