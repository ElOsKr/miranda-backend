import server from '../src/server';
import { agent } from 'supertest';
import 'dotenv'


const request = agent(server)

const user = {
    email: process.env.LOGIN_USER,
    password: process.env.LOGIN_PASSWORD
}

describe("User access", ()=>{
    it("Should return 401 unauthorized", async ()=> {
        const response =  await request.get("/bookings")

        expect(response.statusCode).toBe(401);
    })
    
    it("Should return the token with the correct user", async ()=>{
        const response = await request
        .post("/login")
        .send(user)
        .expect(200)
        .expect("Content-Type",/json/)

        await request
        .get("/bookings")
        .set("Authorization", "bearer " + response.body.token)
        .expect(200);

        
    })
})