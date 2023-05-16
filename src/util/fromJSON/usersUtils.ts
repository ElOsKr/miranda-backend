/* eslint-disable indent */
import { UserType } from '@src/@types/userType';
import fs from 'fs';

export const saveToDatabase = (DB: UserType[]) => {
    fs.writeFileSync('src/data/users.json',JSON.stringify(DB, null , 2), {
        encoding: 'utf-8',
    });
};