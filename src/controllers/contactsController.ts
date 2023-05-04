/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable indent */
/* eslint-disable max-len */
import { ContactsType } from '@src/@types/contactType';
import { 
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact, 
} from '@src/services/contactsService';
import express from 'express';

export const getAllContacts = (req: express.Request ,res: express.Response) => {
    try{
        const allContacts = getContacts();
        res.send({status: 'OK', data: allContacts});
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const getOneContact = (req: express.Request ,res: express.Response) => {
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
        const contact = getContact(contactId);
        res.send({status: 'OK', data: contact});       
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }


};

export const createOneContact = (req: express.Request ,res: express.Response) => {
    
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
        id: body.id,
        customer: {
          name: body.customer.name,
          email: body.orderDate.email,
          phone: body.customer.phone,
        },
        subject: body.subject,
        comment: body.comment,
        status: body.status,
    };

    try{
        const createdContact = createContact(newContact);
        res.send({status: 'OK', data: createdContact});
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }
};

export const updateOneContact = (req: express.Request ,res: express.Response) => {
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
        const updatedContact = updateContact(contactId,body);
        res.send({status: 'OK', data: updatedContact});        
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }

};

export const deleteOneContact = (req: express.Request ,res: express.Response) => {
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
        deleteContact(contactId);
        res.send({status: 'OK'});        
    }catch(error){
        res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error}});
    }

};