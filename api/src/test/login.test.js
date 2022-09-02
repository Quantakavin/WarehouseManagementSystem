import app from '../../index.js';

const request = require('supertest');

describe('Login', () => {
    describe('enter empty email and password', () => {
        test('should respond with 400 status code and appropriate message', async () => {
            const response = await request(app).post('/api/login').send({
                email: '',
                password: ''
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('Please fill up all fields correctly');
        });
    });
    describe('enter invalid email', () => {
        test('should respond with 400 status code and appropriate message', async () => {
            const response = await request(app).post('/api/login').send({
                email: 'admin@gmailcom',
                password: 'Password12@'
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('Please enter a valid email');
        });
    });
    describe('enter invalid password', () => {
        test('should respond with 400 status code and appropriate message', async () => {
            const response = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'password'
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('Please enter a valid password');
        });
    });
    describe("enter email that doesn't exist", () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const response = await request(app).post('/api/login').send({
                email: 'abcxyz@gmail.com',
                password: 'Password12@'
            });
            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe("User with email doesn't exist");
        });
    });
    describe('enter invalid/email password combination', () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const response = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password1@'
            });
            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe("Invalid Email/Password Combination");
        });
    });
    describe('login as inactivated user', () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const response = await request(app).post('/api/login').send({
                email: 'salesmanager2@gmail.com',
                password: 'Password12@'
            });
            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe("Your account has been deactivated");
        });
    });
    describe('enter correct email and password', () => {
        test('should respond with 200 status code and appropriate data', async () => {
            const response = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            expect(response.header['content-type']).toEqual(expect.stringContaining('json'));
            expect(response.statusCode).toBe(200);
            expect(response.body.id).toBeDefined();
            expect(response.body.name).toBeDefined();
            expect(response.body.usergroup).toBeDefined();
            expect(response.body.permissions).toBeDefined();
            expect(response.body.enabled2FA).toBeDefined();
            expect(response.body.mobileNo).toBeDefined();
            expect(response.body.telegramid).toBeDefined();
            expect(response.body.unreadnotifications).toBeDefined();
            expect(response.body.token).toBeDefined();
        });
    });
});