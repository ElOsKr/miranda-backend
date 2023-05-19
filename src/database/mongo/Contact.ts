import { ContactsType } from '@src/@types/contactType';
import { contactModel } from '../mongo-models/contactModel';

export const getAllContacts = async () => {
    try{
        const contacts = await contactModel.find();
        return contacts;
    }catch(error){
        throw { status: 500, message: error};
    }
};

export const getOneContact = async (contactId: string) => {
    try{
        const contact = await contactModel.find({id: contactId})
        return contact;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const createNewContact = async (newContact: ContactsType): Promise<ContactsType> => {
    try{
        await contactModel.create(newContact)
        return newContact;
    }catch (error){
        throw {
            status: 500,
            message: error?.message || error,
        };
    }
};

export const updateOneContact = async (contactId: string, changes: Omit<Partial<ContactsType>, "id">) => {
    try{
        await contactModel.findOneAndUpdate({id: contactId}, changes);
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const deleteOneContact = async (contactId: string): Promise<void> => {
    try{
        await contactModel.findOneAndDelete({id: contactId});
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};