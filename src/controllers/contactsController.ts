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
        !body.customer||
        !body.subject||
        !body.comment||
        (!body.status && typeof body.status !== "boolean")
    ){
        res.status(400).send({
            status: 'Failed',
            data: {
                error: 'Cannot create object',
            },
        });
    }
    
    for ( const key in body ){
        if(!body[key] && body.status!==false){
            res.status(400).send({
                status: 'Failed',
                data: {
                    error: 'missing params',
                },
            });
        }
    }

    const newContact: ContactsType = {
        id: uuid(),
        customer: JSON.stringify(body.customer),
        subject: body.subject,
        comment: body.comment,
        status: body.status,
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
        if(body.id){
            throw new Error("Cannot update id")
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