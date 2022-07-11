import supertest from 'supertest';
import user from '../routes/userRoutes';

describe("Post /login", () => {
    describe("given email,password", () => {
        it("should respond with 200 status code", async () => {
            const response = await request(user).post("/user").send({
                email: "username",
                password: "password"
            })
            expect(response.statusCode).toBe(200)
        })
        it("should specify json in the content type header", async () => {
            const response = await request(user).post("/user").send({
                email: "username",
                password: "password"
            })
            expect(response.header['content-type']).toEqual(expect.stringContaining("json"));
        })
    })
})