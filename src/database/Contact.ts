import { ContactsType } from '@src/@types/contactType';
import { connection } from './connectionDB';
import { contactSchema } from '../util/validate/contactsValidate';

export const getAllContacts = async () => {
    try{
        const contacts = (await connection).execute(
            'SELECT * FROM contacts',
        );
        return contacts;
    }catch(error){
        throw { status: 500, message: error};
    }
};

export const getOneContact = async (contactId: string) => {
    try{
        const contact = (await connection).execute(
            'SELECT * FROM contacts where contact_id = ?',
            [contactId],
        );
        return contact;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const createNewContact = async (newContact: ContactsType) => {
    try{
        contactSchema.validate(newContact);
        (await connection).query(
            'INSERT INTO contacts SET ?',
            [newContact],
        );
        return newContact;
    }catch (error){
        throw {
            status: 500,
            message: error?.message || error,
        };
    }
};

export const updateOneContact = async (contactId: string, changes: any) => {
    try{
        (await connection).query(
            'UPDATE contact set ? where contact_id=?',
            [changes,contactId],
        );
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const deleteOneContact = async (contactId: string) => {
    try{
        (await connection).execute(
            'DELETE FROM contacts where contact_id=?',
            [contactId],
        );
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }


};