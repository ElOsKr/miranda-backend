import { faker } from '@faker-js/faker';
import { RoomType } from './@types/roomType';
import {uuid}  from 'uuidv4';
import { createNewRoom } from './database/Rooms';
import { connection } from './database/connectionDB';
import { UserType } from './@types/userType';
import { createNewUser } from './database/Users';
import { ContactsType } from './@types/contactType';
import { createNewContact } from './database/Contact';
import { BookingsType } from './@types/bookingsType';
import { createNewBooking } from './database/Bookings';
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
            room_id: uuid(),
            room_number: faker.datatype.number({min: 0, max: 500}),
            room_photo: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/376374041.jpg?k=33f539035e74461bd374023afc086f01c5a7849d5a3cfa6df49baa41177a2c52&o=',
            room_type: faker.helpers.arrayElement(['double bed','single','duplex']),
            room_amenities: JSON.stringify([faker.company.catchPhraseDescriptor(),faker.company.catchPhraseDescriptor()]),
            room_price: faker.datatype.number({min: 100, max: 500}),
            room_offer: faker.datatype.number({min: 0, max: 99}),
            room_status: faker.datatype.boolean(),
        };
        rooms_ids.push(room.room_id)
        createNewRoom(room);
    }
};

const createUsers = (numberUsers: number) => {
    const salt = bcrypt.genSaltSync(10);
    for(let i = 0; i<numberUsers; i++){
        const user: UserType = {
            user_id: uuid(),
            user_name: faker.name.fullName(),
            user_password: bcrypt.hashSync(faker.internet.password(),salt),
            user_photo: faker.image.avatar(),
            user_email: faker.internet.exampleEmail(),
            user_description: faker.company.bsBuzz(),
            user_contact: Number(faker.phone.number('6########')),
            user_status: faker.datatype.boolean() 
        };
        createNewUser(user);
    }
}

const createContacts = (numberContacts: number) => {
    for(let i = 0; i<numberContacts; i++){
        const contact: ContactsType = {
            contact_id: uuid(),
            contact_customer: JSON.stringify(
                {
                    name: faker.name.fullName(),
                    email: faker.internet.exampleEmail(),
                    phone: Number(faker.phone.number('6########'))
                }
            ),
            contact_subject: faker.company.bs(),
            contact_comment: faker.company.catchPhraseDescriptor(),
            contact_status: faker.datatype.boolean()
        };
        createNewContact(contact);
    }
}

const createBookings = async (numberBookings: number) => {
    for(let i = 0; i<numberBookings; i++){
        const booking: BookingsType = {
            booking_photo: "https://www.riazorhotel.com/wp-content/blogs.dir/1623/files/home/HOME_SLIDER_1-1.jpg",
            booking_id: uuid(),
            booking_guest: faker.name.fullName(),
            booking_orderDate: faker.date.between('2023-01-01T00:00:00.000Z', '2023-01-12T00:00:00.000Z'),
            booking_checkin: faker.date.between('2023-01-13T00:00:00.000Z', '2023-01-20T00:00:00.000Z'),
            booking_checkout: faker.date.between('2023-01-21T00:00:00.000Z', '2023-01-31T00:00:00.000Z'),
            room_Id: rooms_ids[i],
            booking_price: faker.datatype.number({min: 100, max: 500}),
            booking_amenities: JSON.stringify([faker.company.catchPhraseDescriptor(),faker.company.catchPhraseDescriptor()]),
            booking_specialRequest: faker.company.catchPhraseAdjective(),
            booking_description: faker.company.catchPhrase(),
            booking_status: faker.helpers.arrayElement(['checkOut','checkIn','inProgress'])
        };
        createNewBooking(booking)
    }
}

main();
