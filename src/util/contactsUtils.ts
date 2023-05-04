/* eslint-disable indent */
import { ContactsType } from '@src/@types/contactType';
import fs from 'fs';

export const saveToDatabase = (DB: ContactsType[]) => {
    fs.writeFileSync('src/data/Contacts.json',JSON.stringify(DB, null , 2), {
        encoding: 'utf-8',
    });
};