/* eslint-disable indent */
import { RoomType } from '@src/@types/roomType';
import fs from 'fs';

export const saveToDatabase = (DB: RoomType[]) => {
    fs.writeFileSync('src/data/Room.json',JSON.stringify(DB, null , 2), {
        encoding: 'utf-8',
    });
};