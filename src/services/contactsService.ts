import { ContactsType } from '../@types/contactType';
import { createNewContact, deleteOneContact, getAllContacts, getOneContact, updateOneContact } from '../database/mongo/Contact';

export const getContacts = async () => {
    try{
        const allContacts = await getAllContacts();
        return allContacts;        
    }catch(error){
        throw error;
    }

};

export const getContact = async (contactId: string) => {
    try{
        const contact = await getOneContact(contactId);
        return contact;
    }catch(error){
        throw error;
    }
};

export const createContact = async (newContact: ContactsType) => {
    try{
        const createContact = await createNewContact(newContact);
        return createContact;
    }catch (error){
        throw error;
    }
};

export const updateContact = async (contactId: string, changes: Omit<Partial<ContactsType>, "contact_id">) => {
    try{
        const updatedContact = await updateOneContact(contactId,changes);
        return updatedContact;
    }catch(error){
        throw error;
    }
};

export const deleteContact = async (contactId: string) => {
    try{
       await deleteOneContact(contactId);
    }catch(error){
        throw error;
    } 
};