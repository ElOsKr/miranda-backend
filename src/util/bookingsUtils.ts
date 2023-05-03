/* eslint-disable indent */
import { BookingsType } from '@src/@types/bookingsType';
import fs from 'fs';

export const saveToDatabase = (DB: BookingsType[]) => {
    fs.writeFileSync('src/data/bookings.json',JSON.stringify(DB, null , 2), {
        encoding: 'utf-8',
    });
};