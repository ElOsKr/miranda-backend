import { ContactsType } from "@src/@types/contactType";
import joi from 'joi'

export const contactSchema = joi.object<ContactsType>({
    contact_id: joi.string().guid({version: 'uuidv4'}).required(),
    contact_customer: joi.string().required(),
    contact_subject: joi.string().required(),
    contact_comment: joi.string().required(),
    contact_status: joi.boolean().required()
})