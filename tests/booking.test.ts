import server from '../src/server';
import { agent } from 'supertest';
import 'dotenv'

const bookingCreate = {
    photo: "https://www.riazorhotel.com/wp-content/blogs.dir/1623/files/home/HOME_SLIDER_1-1.jpg",
    guest: "Duane Towne",
    orderDate: "2023-01-01T10:00:35.787Z",
    checkin: "2023-01-17T06:17:20.111Z",
    checkout: "2023-01-21T06:27:00.403Z",
    room_Id: "4625716c-4414-40d7-ac73-f190b0945ca8",
    price: 399,
    amenities: [
      "value-added",
      "exuding"
    ],
    specialRequest: "Digitized",
    description: "De-engineered actuating service-desk",
    status: "inProgress",
}

const request = agent(server)

const user = {
    email: process.env.LOGIN_USER,
    password: process.env.LOGIN_PASSWORD
}

describe("Bookings test", ()=>{
    let token: string;
    let id: string;
    beforeAll(async () => {
        token = (await request.post("/login").send(user)).body.token
    })

    it("Get all bookings", async () => {
        const response = await request.get("/bookings").set("Authorization",`bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual("application/json");
        expect(typeof response.body.data[0]).toMatch("object");
    })

    it("Create one booking", async () => {
        const response = await request.post("/bookings")
        .set("Authorization",`bearer ${token}`)
        .send(bookingCreate);

        id = response.body.data.id;

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual("application/json");
        expect(response.body.data).toEqual({...bookingCreate, id:id});
    })

    it("Get one booking", async () => {
        const response = await request.get(`/bookings/${id}`)
        .set("Authorization",`bearer ${token}`);

        const booking = response.body.data[0];

        delete booking.__v;
        delete booking._id;

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual("application/json");
        expect(booking).toEqual({...bookingCreate, id:id});
    })

    it("Update one booking", async () => {
        const response = await request.patch(`/bookings/${id}`)
        .set("Authorization",`bearer ${token}`)
        .send({guest: "yo"});

        const responseEdited = await request.get(`/bookings/${id}`)
        .set("Authorization",`bearer ${token}`);

        const bookingEdited = responseEdited.body.data[0]

        delete bookingEdited.__v;
        delete bookingEdited._id;


        expect(response.statusCode).toBe(200);
        expect(responseEdited.type).toEqual("application/json");
        expect(bookingEdited).toEqual({...bookingCreate, id: id, guest: "yo"});
    })

    it("Delete one booking", async () => {
        const response = await request.delete(`/bookings/${id}`)
        .set("Authorization",`bearer ${token}`)

        expect(response.statusCode).toBe(200);
    })


})