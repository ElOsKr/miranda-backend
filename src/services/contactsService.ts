/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable indent */
import { ContactsType } from '@src/@types/contactType';
import { createNewContact, deleteOneContact, getAllContacts, getOneContact, updateOneContact } from '@src/database/Contact';
import {uuid}  from 'uuidv4';

export const getContacts = () => {
    try{
        const allContacts = getAllContacts();
        return allContacts;        
    }catch(error){
        throw error;
    }

};

export const getContact = (contactId: string) => {
    try{
        const contact = getOneContact(contactId);
        return contact;
    }catch(error){
        throw error;
    }
};

export const createContact = (newContact: ContactsType) => {
    const contactToInsert: ContactsType = {
        ...newContact,
        id: uuid(),
    };
    try{
        const createContact = createNewContact(contactToInsert);

        return createContact;
    }catch (error){
        throw error;
    }
};

export const updateContact = (contactId: string, changes: any) => {
    try{
        const updatedContact = updateOneContact(contactId,changes);
        return updatedContact;
    }catch(error){
        throw error;
    }
};

export const deleteContact = (contactId: string) => {
    try{
        deleteOneContact(contactId);
    }catch(error){
        throw error;
    } 
};