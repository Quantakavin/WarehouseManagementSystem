import user from '../routes/userRoutes';
const request = require('supertest');

describe('Post /login', () => {
    describe('given email,password', () => {
        test('should respond with 200 status code', async () => {
            const response = await request(user).post('/user').send({
                email: 'user@gmail.com',
                password: 'password'
            });
            expect(response.statusCode).toBe(200);
        });
        test('should specify json in the content type header', async () => {
            const response = await request(user).post('/user').send({
                email: 'username',
                password: 'password'
            });
            expect(response.header['content-type']).toEqual(expect.stringContaining('json'));
        });
    });
});
