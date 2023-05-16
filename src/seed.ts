import { faker } from '@faker-js/faker';
import { RoomType } from './@types/roomType';
import {uuid}  from 'uuidv4';
import { createNewRoom } from './database/mysql/Rooms';
import { connection } from './database/mysql/connectionDB';
import { UserType } from './@types/userType';
import { createNewUser } from './database/mysql/Users';
import { ContactsType } from './@types/contactType';
import { createNewContact } from './database/mysql/Contact';
import { BookingsType } from './@types/bookingsType';
import { createNewBooking } from './database/mysql/Bookings';
import bcrypt from 'bcrypt';

let rooms_ids: string[] = [];

async function main(): Promise<void>{
    (await connection).connect();
    createRooms(10);
    createUsers(10);
    createContacts(10);
    createBookings(10);
    (await connection).end()
}

const createRooms = (numberRooms: number) => {
    for(let i = 0; i<numberRooms; i++){
        const room: RoomType = {
            id: uuid(),
            number: faker.datatype.number({min: 0, max: 500}),
            photo: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/376374041.jpg?k=33f539035e74461bd374023afc086f01c5a7849d5a3cfa6df49baa41177a2c52&o=',
            type: faker.helpers.arrayElement(['double bed','single','duplex']),
            amenities: JSON.stringify([faker.company.catchPhraseDescriptor(),faker.company.catchPhraseDescriptor()]),
            price: faker.datatype.number({min: 100, max: 500}),
            offer: faker.datatype.number({min: 0, max: 99}),
            status: faker.datatype.boolean(),
        };
        rooms_ids.push(room.id)
        createNewRoom(room);
    }
};

const createUsers = (numberUsers: number) => {
    const salt = bcrypt.genSaltSync(10);
    for(let i = 0; i<numberUsers; i++){
        const user: UserType = {
            id: uuid(),
            name: faker.name.fullName(),
            password: bcrypt.hashSync(faker.internet.password(),salt),
            photo: faker.image.avatar(),
            email: faker.internet.exampleEmail(),
            description: faker.company.bsBuzz(),
            contact: Number(faker.phone.number('6########')),
            status: faker.datatype.boolean() 
        };
        createNewUser(user);
    }
}

const createContacts = (numberContacts: number) => {
    for(let i = 0; i<numberContacts; i++){
        const contact: ContactsType = {
            id: uuid(),
            customer: JSON.stringify(
                {
                    name: faker.name.fullName(),
                    email: faker.internet.exampleEmail(),
                    phone: Number(faker.phone.number('6########'))
                }
            ),
            subject: faker.company.bs(),
            comment: faker.company.catchPhraseDescriptor(),
            status: faker.datatype.boolean()
        };
        createNewContact(contact);
    }
}

const createBookings = async (numberBookings: number) => {
    for(let i = 0; i<numberBookings; i++){
        const booking: BookingsType = {
            photo: "https://www.riazorhotel.com/wp-content/blogs.dir/1623/files/home/HOME_SLIDER_1-1.jpg",
            id: uuid(),
            guest: faker.name.fullName(),
            orderDate: faker.date.between('2023-01-01T00:00:00.000Z', '2023-01-12T00:00:00.000Z'),
            checkin: faker.date.between('2023-01-13T00:00:00.000Z', '2023-01-20T00:00:00.000Z'),
            checkout: faker.date.between('2023-01-21T00:00:00.000Z', '2023-01-31T00:00:00.000Z'),
            room_Id: rooms_ids[i],
            price: faker.datatype.number({min: 100, max: 500}),
            amenities: JSON.stringify([faker.company.catchPhraseDescriptor(),faker.company.catchPhraseDescriptor()]),
            specialRequest: faker.company.catchPhraseAdjective(),
            description: faker.company.catchPhrase(),
            status: faker.helpers.arrayElement(['checkOut','checkIn','inProgress'])
        };
        createNewBooking(booking)
    }
}

main();
