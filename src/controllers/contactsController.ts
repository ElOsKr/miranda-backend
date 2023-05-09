import { ContactsType } from '@src/@types/contactType';
import { 
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact, 
} from '@src/services/contactsService';
import express from 'express';

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
        !body.id||
        !body.customer||
        !body.subject||
        !body.comment
    ){
        res.status(400).send({
            status: 'Failed',
            data: {
                error: 'Cannot create object',
            },
        });
        return;
    }
    
    for ( const key in body ){
        if(!body[key]){
            res.status(400).send({
                status: 'Failed',
                data: {
                    error: 'missing params',
                },
            });
        }
        return;
    }

    const newContact: ContactsType = {
        contact_id: body.id,
        contact_customer: JSON.stringify(body.customer),
        contact_subject: body.subject,
        contact_comment: body.comment,
        contact_status: body.status,
    };

    try{
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