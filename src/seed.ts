import { faker } from '@faker-js/faker';
import { RoomType } from './@types/roomType';
import {uuid}  from 'uuidv4';
import { UserType } from './@types/userType';
import { ContactsType } from './@types/contactType';
import { BookingsType } from './@types/bookingsType';
import bcrypt from 'bcryptjs';
import { connect, disconnect } from './database/mongo-models/connectionMongo';
import { contactModel } from './database/mongo-models/contactModel';
import { roomModel } from './database/mongo-models/roomsModel';
import { userModel } from './database/mongo-models/usersModel';
import { bookingModel } from './database/mongo-models/bookingModel';

let rooms_ids: string[] = [];

const connection = async () => await connect();

async function main(): Promise<void>{
    connection()
    await createRooms(10);
    await createUsers(10);
    await createContacts(10);
    await createBookings(10);
    await disconnect();
}

const createRooms = async (numberRooms: number): Promise<void> => {

    for(let i = 0; i<numberRooms; i++){
        const room: RoomType = {
            id: uuid(),
            number: faker.datatype.number({min: 0, max: 500}),
            photo: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/376374041.jpg?k=33f539035e74461bd374023afc086f01c5a7849d5a3cfa6df49baa41177a2c52&o=',
            type: faker.helpers.arrayElement(["Double Bed","Single Bed","Suite","Double Superior"]),
            amenities: [faker.company.catchPhraseDescriptor(),faker.company.catchPhraseDescriptor()],
            price: faker.datatype.number({min: 100, max: 500}),
            offer: faker.datatype.number({min: 0, max: 99}),
            status: faker.datatype.boolean(),
        };
        rooms_ids.push(room.id)
        await roomModel.create(room)
    }
};

const createUsers = async (numberUsers: number): Promise<void> => {

    const salt = bcrypt.genSaltSync(10);
    for(let i = 0; i<numberUsers; i++){
        const user: UserType = {
            id: uuid(),
            name: faker.name.fullName(),
            password: bcrypt.hashSync(faker.internet.password(),salt),
            photo: faker.image.avatar(),
            joined: faker.date.between('2023-01-01T00:00:00.000Z', '2023-01-12T00:00:00.000Z'),
            email: faker.internet.exampleEmail(),
            description: faker.company.bsBuzz(),
            contact: Number(faker.phone.number('6########')),
            status: faker.datatype.boolean() 
        };
        await userModel.create(user)
    }
}

const createContacts = async (numberContacts: number): Promise<void> => {

    for(let i = 0; i<numberContacts; i++){
        const contact: ContactsType = {
            id: uuid(),
            customer:
                {
                    name: faker.name.fullName(),
                    email: faker.internet.exampleEmail(),
                    phone: Number(faker.phone.number('6########'))
                }
            ,
            sended: faker.date.between('2023-01-01T00:00:00.000Z', '2023-01-12T00:00:00.000Z'),
            subject: faker.company.bs(),
            comment: faker.company.catchPhraseDescriptor(),
            status: faker.datatype.boolean()
        };
        await contactModel.create(contact)
    }

}

const createBookings = async (numberBookings: number): Promise<void> => {
    
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
            amenities: [faker.company.catchPhraseDescriptor(),faker.company.catchPhraseDescriptor()],
            specialRequest: faker.company.catchPhraseAdjective(),
            description: faker.company.catchPhrase(),
            status: faker.helpers.arrayElement(['checkOut','checkIn','inProgress'])
        };
        await bookingModel.create(booking)
    }
}

main();
