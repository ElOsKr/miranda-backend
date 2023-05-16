import { ContactsType } from "@src/@types/contactType";
import joi from 'joi'

export const contactSchema = joi.object<ContactsType>({
    id: joi.string().guid({version: 'uuidv4'}),
    customer: joi.object(),
    subject: joi.string(),
    comment: joi.string(),
    status: joi.boolean()
})