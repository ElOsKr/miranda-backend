import { ContactsType } from '@src/@types/contactType';
import { 
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact, 
} from '@src/services/contactsService';
import { contactSchema } from '@src/util/validate/contactsValidate';
import express from 'express';
import { uuid } from 'uuidv4';

export const getAllContacts = async (req: express.Request ,res: express.Response) => {
    try{
        const allContacts = await getContacts();
        res.send({status: 'OK', data: allContacts});
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const getOneContact = async (req: express.Request ,res: express.Response) => {
    const {
        params: {contactId},
    } = req;
    if(!contactId){
        res.status(400).send({
            status: 'FAILED',
            data: {error: 'ContactId can not be empty'},
        });
    }

    try{
        const contact = await getContact(contactId);
        res.send({status: 'OK', data: contact});       
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }


};

export const createOneContact = async (req: express.Request ,res: express.Response) => {
    
    const { body } = req;

    if(
        !body.contact_customer||
        !body.contact_subject||
        !body.contact_comment||
        (!body.contact_status && typeof body.contact_status !== "boolean")
    ){
        res.status(400).send({
            status: 'Failed',
            data: {
                error: 'Cannot create object',
            },
        });
    }
    
    for ( const key in body ){
        if(!body[key] && body.contact_status!==false){
            res.status(400).send({
                status: 'Failed',
                data: {
                    error: 'missing params',
                },
            });
        }
    }

    const newContact: ContactsType = {
        contact_id: uuid(),
        contact_customer: JSON.stringify(body.contact_customer),
        contact_subject: body.contact_subject,
        contact_comment: body.contact_comment,
        contact_status: body.contact_status,
    };

    try{
        await contactSchema.validateAsync(newContact)
        const createdContact = await createContact(newContact);
        res.send({status: 'OK', data: createdContact});
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const updateOneContact = async (req: express.Request ,res: express.Response) => {
    const {
        body,
        params: { contactId },
    } = req;

    if(!contactId){
        res.status(400).send({
            status: 'FAILED',
            data: {error: 'ContactId can not be empty'},
        });
    }

    try{
        if(body.contact_id){
            throw new Error("Cannot update contact_id")
        }
        await contactSchema.validateAsync(body)
        const updatedContact = await updateContact(contactId,body);
        res.send({status: 'OK', data: updatedContact});        
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }

};

export const deleteOneContact = async (req: express.Request ,res: express.Response) => {
    const {
        params: { contactId },
    }= req;

    if(!contactId){
        res.status(400).send({
            status: 'FAILED',
            data: {error: 'ContactId can not be empty'},
        });
    }

    try{
        await deleteContact(contactId);
        res.send({status: 'OK'});        
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }

};