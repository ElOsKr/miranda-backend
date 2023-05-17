import server from '../src/server';
import { agent } from 'supertest';
import 'dotenv'
import { BookingsType } from '../src/@types/bookingsType';


const request = agent(server)

const user = {
    email: process.env.LOGIN_USER,
    password: process.env.LOGIN_PASSWORD
}

describe("Bookings test", ()=>{
    let token: string;
    beforeAll(async () => {
        token = (await request.post("/login").send(user)).body.token
    })

    it("Get all bookings", async () => {
        const response = await request.get("/bookings").set("Authorization",`bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual("application/json");
        expect(typeof response.body.data[0]).toMatch("object");
    })
})