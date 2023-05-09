import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { RoomType } from './@types/roomType';
import {uuid}  from 'uuidv4';
import { createNewRoom } from './database/Rooms';
import { connection } from './database/connectionDB';
import { UserType } from './@types/userType';

async function main(): Promise<void>{
    createRooms(10);
    createUsers(10);
    (await connection).end()
}

const createRooms = (numberRooms: number) => {
    for(let i = 0; i<numberRooms; i++){
        const room: RoomType = {
            room_id: uuid(),
            room_number: faker.datatype.number({min: 0, max: 500}),
            room_photo: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/376374041.jpg?k=33f539035e74461bd374023afc086f01c5a7849d5a3cfa6df49baa41177a2c52&o=',
            room_type: faker.company.catchPhraseDescriptor(),
            room_amenities: faker.company.catchPhraseDescriptor(),
            room_price: faker.datatype.number({min: 100, max: 500}),
            room_offer: faker.datatype.number({min: 0, max: 99}),
            room_status: faker.datatype.boolean(),
        };
        createNewRoom(room);
    }
};

const createUsers = (numberUsers: number) => {
    
    for(let i = 0; i<numberUsers; i++){
        const user: UserType = {
            user_id: uuid(),
            user_name: faker.name.fullName(),
            user_photo: faker.image.avatar(),
            user_email: faker.internet.exampleEmail(),
            user_description: faker.company.bsBuzz(),
            user_contact: Number(faker.phone.number('#########')),
            user_status: faker.datatype.boolean() 
        }
    }
}

main();
