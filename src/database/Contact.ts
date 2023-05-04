/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
/* eslint-disable indent */
import { ContactsType } from '@src/@types/contactType';
import contacts from '@src/data/contact.json';
import { saveToDatabase } from '@src/util/contactsUtils';

export const getAllContacts = () => {
    try{
        return contacts;
    }catch(error){
        throw { status: 500, message: error};
    }
};

export const getOneContact = (contactId: string) => {

    try{
        const contact = contacts.find((contact) => contact.id === contactId);

        if(!contact){
            throw{
                status: 400,
                message: `Can't find Contact with the id ${contactId}`,
            };
        }
        return contact;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const createNewContact = (newContact: ContactsType) => {
    const isAlreadyAdded = contacts.findIndex((contact) => contact.id === newContact.id);

    if(isAlreadyAdded){
        throw{
            status: 400,
            message: 'The object already exists',
        };
    }

    try{
        const addedContact = contacts;
        addedContact.push(newContact);
        saveToDatabase(addedContact);
        return newContact;
    }catch (error){
        throw {
            status: 500,
            message: error?.message || error,
        };
    }
};

export const updateOneContact = (contactId: string, changes: any) => {

    try{
        const indexForUpdate = contacts.findIndex((contact) => contact.id === contactId);

        if(indexForUpdate ===-1){
            throw{
                status: 400,
                message: `Can't find Contact with the id ${contactId}`,
            };
        }

        contacts.map((contact)=> {
            if(contact.id===contactId){
                const updatedContact: ContactsType = {
                    ...contact,
                    ...changes,
                };

                contacts[indexForUpdate] = updatedContact;

                saveToDatabase(contacts);
                return updatedContact;
            }else{
                return;
            }
        });
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const deleteOneContact = (contactId: string) => {

    try{
        const deleteContact = contacts.filter((contact)=> contact.id!==contactId);

        if(deleteContact.length === contacts.length){
            throw{
                status: 400,
                message: `Can't find Contact with the id ${contactId}`,
            };
        }

        saveToDatabase(deleteContact);        
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }


};