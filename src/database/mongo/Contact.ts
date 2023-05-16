import { ContactsType } from '@src/@types/contactType';
import { connect, disconnect } from '../mongo-models/connectionMongo';
import { contactModel } from '../mongo-models/contactSchema';

export const getAllContacts = async () => {
    try{
        await connect();
        const contacts = await contactModel.find();
        await disconnect();
        return contacts;
    }catch(error){
        throw { status: 500, message: error};
    }
};

export const getOneContact = async (contactId: string) => {
    try{
        await connect();
        const contact = await contactModel.findById(contactId)
        await disconnect()
        return contact;
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const createNewContact = async (newContact: ContactsType): Promise<ContactsType> => {
    try{
        await connect();
        await contactModel.create(newContact)
        await disconnect();
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
        await connect();
        await contactModel.findOneAndUpdate({id: contactId}, changes);
        await disconnect();
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }
};

export const deleteOneContact = async (contactId: string): Promise<void> => {
    try{
        await connect();
        await contactModel.findOneAndDelete({id: contactId});
        await disconnect()
    }catch(error){
        throw { status: error?.status||500 , message: error?.message || error};
    }


};