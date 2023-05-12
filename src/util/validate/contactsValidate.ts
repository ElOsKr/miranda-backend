import { ContactsType } from "@src/@types/contactType";
import joi from 'joi'

export const contactSchema = joi.object<ContactsType>({
    contact_id: joi.string().guid({version: 'uuidv4'}),
    contact_customer: joi.string(),
    contact_subject: joi.string(),
    contact_comment: joi.string(),
    contact_status: joi.boolean()
})