import app from '../../index.js';
import user from '../controllers/userController';

const request = require('supertest');

describe('View All Users', () => {
    describe('not logged in', () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const response = await request(app).get('/api/users')
            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe("Please login first");
        });
    });
    describe('logged in as non admin', () => {
        test('should respond with 403 status code and appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'salesengineer@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).get('/api/users').set(
                'Authorization', `Bearer ${token}`,
            );
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe("Only Admins can access this function");
        });
    });
    describe('logged in as admin', () => {
        test('should respond with 200 status code and appropriate data', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).get('/api/users').set(
                'Authorization', `Bearer ${token}`,
            );
            expect(response.header['content-type']).toEqual(expect.stringContaining('json'));
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBeGreaterThanOrEqual(0);
            if (response.body.length > 0) {
                const firstUser = response.body[0]
                expect(firstUser.UserID).toBeDefined();
                expect(firstUser.Username).toBeDefined();
                expect(firstUser.Email).toBeDefined();
                expect(firstUser.CompanyName).toBeDefined();
                expect(firstUser.UserGroupName).toBeDefined();
                expect(firstUser.MobileNo).toBeDefined();
            }
        });
    });
});

describe('View User Information', () => {
    describe('not logged in', () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const response = await request(app).get('/api/user/1')
            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe("Please login first");
        });
    });
    describe('logged in as non admin', () => {
        test('should respond with 403 status code and appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'salesengineer@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).get('/api/user/1').set(
                'Authorization', `Bearer ${token}`,
            );
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe("Only Admins can access this function");
        });
    });
    describe('logged in as admin and userid doesn\t exist', () => {
        test('should respond with 404 status code and appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).get('/api/user/987654321').set(
                'Authorization', `Bearer ${token}`,
            );
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe("Cannot find user with that id");
        });
    });
    describe('logged in as admin and userid exists', () => {
        test('should respond with 200 status code and appropriate data', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).get('/api/user/1').set(
                'Authorization', `Bearer ${token}`,
            );
            expect(response.header['content-type']).toEqual(expect.stringContaining('json'));
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBeGreaterThanOrEqual(0);
            const firstUser = response.body[0]
            expect(firstUser.Active).toBeDefined();
            expect(firstUser.Username).toBeDefined();
            expect(firstUser.Email).toBeDefined();
            expect(firstUser.CompanyName).toBeDefined();
            expect(firstUser.CompanyID).toBeDefined();
            expect(firstUser.UserGroupName).toBeDefined();
            expect(firstUser.UserGroupID).toBeDefined();
            expect(firstUser.MobileNo).toBeDefined();
            expect(firstUser.NotificationGroups).toBeDefined();
            expect(firstUser.Permissions).toBeDefined();
        });
    });
});

describe('Add User', () => {
    describe('not logged in', () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const response = await request(app).post('/api/user').send(
                {
                    name: 'anonymous',
                    email: 'anonymous@gmail.com',
                    mobileno: '97498452',
                    password: 'Password1@',
                    company: 3,
                    usergroup: 4,
                    notificationgroups: [{ NotiGroupID: 2 }, { NotiGroupID: 35 }]
                }
            );
            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe("Please login first");
        });
    });
    describe('logged in as non admin', () => {
        test('should respond with 403 status code and appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'salesengineer@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).post('/api/user').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'anonymous',
                    email: 'anonymous@gmail.com',
                    mobileno: '97498452',
                    password: 'Password1@',
                    company: 3,
                    usergroup: 4,
                    notificationgroups: [{ NotiGroupID: 2 }, { NotiGroupID: 35 }]
                }
            );
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe("Only Admins can access this function");
        });
    });
    describe('empty form fields', () => {
        test('should respond with 400 status code and appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).post('/api/user').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: '',
                    email: '',
                    mobileno: '',
                    password: '',
                    company: 3,
                    usergroup: 4,
                    notificationgroups: [{ NotiGroupID: 2 }, { NotiGroupID: 35 }]
                }
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Please fill up all fields correctly");
        });
    });
    describe('no company selected', () => {
        test('should respond with 400 status code and appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).post('/api/user').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'anonymous',
                    email: 'anonymous@gmail.com',
                    mobileno: '97498452',
                    password: 'Password1@',
                    company: null,
                    usergroup: 4,
                    notificationgroups: [{ NotiGroupID: 2 }, { NotiGroupID: 35 }]
                }
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Please select the company the user belongs to");
        });
    });
    describe('no usergroup selected', () => {
        test('should respond with 400 status code and appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).post('/api/user').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'anonymous',
                    email: 'anonymous@gmail.com',
                    mobileno: '97498452',
                    password: 'Password1@',
                    company: 3,
                    usergroup: null,
                    notificationgroups: [{ NotiGroupID: 2 }, { NotiGroupID: 35 }]
                }
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Please select a user group to assign the user to");
        });
    });
    describe('invalid email', () => {
        test('should respond with 400 status code and appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).post('/api/user').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'anonymous',
                    email: 'anonymous@gmailcom',
                    mobileno: '97498452',
                    password: 'Password12@',
                    company: 3,
                    usergroup: 4,
                    notificationgroups: [{ NotiGroupID: 2 }, { NotiGroupID: 35 }]
                }
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Please enter a valid email");
        });
    });
    describe('invalid password', () => {
        test('should respond with 400 status code and appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).post('/api/user').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'anonymous',
                    email: 'anonymous@gmail.com',
                    mobileno: '97498452',
                    password: 'password',
                    company: 3,
                    usergroup: 4,
                    notificationgroups: [{ NotiGroupID: 2 }, { NotiGroupID: 35 }]
                }
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Please choose a stronger password");
        });
    });
    describe('invalid phone no', () => {
        test('should respond with 400 status code and appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).post('/api/user').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'anonymous',
                    email: 'anonymous@gmail.com',
                    mobileno: '123',
                    password: 'Password12@',
                    company: 3,
                    usergroup: 4,
                    notificationgroups: [{ NotiGroupID: 2 }, { NotiGroupID: 35 }]
                }
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Please enter a valid phone number");
        });
    });
    describe('duplicate email', () => {
        test('should respond with 422 status code and appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).post('/api/user').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'anonymous',
                    email: 'Admin@gmail.com',
                    mobileno: '97498452',
                    password: 'Password12@',
                    company: 3,
                    usergroup: 4,
                    notificationgroups: [{ NotiGroupID: 2 }, { NotiGroupID: 35 }]
                }
            );
            expect(response.statusCode).toBe(422);
            expect(response.body.message).toBe("User with that email already exists");
        });
    });
    describe('duplicate username', () => {
        test('should respond with 422 status code and appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).post('/api/user').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'Admin',
                    email: 'anonymous@gmail.com',
                    mobileno: '97498452',
                    password: 'Password12@',
                    company: 3,
                    usergroup: 4,
                    notificationgroups: [{ NotiGroupID: 2 }, { NotiGroupID: 35 }]
                }
            );
            expect(response.statusCode).toBe(422);
            expect(response.body.message).toBe("User with that username already exists");
        });
    });
    describe('all form fields valid', () => {
        test('should respond with 201 status code and return appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).post('/api/user').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'anonymous',
                    email: 'anonymous@gmail.com',
                    mobileno: '97498452',
                    password: 'Password12@',
                    company: 3,
                    usergroup: 4,
                    notificationgroups: [{ NotiGroupID: 2 }, { NotiGroupID: 35 }]
                }
            );
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe('User created successfully!');
        });
    });
});

describe('Edit User', () => {
    describe('not logged in', () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const lastuser = await user.getLastID();
            const response = await request(app).put(`/api/user/${lastuser[0].UserID}`).send(
                {
                    name: 'anonymous2',
                    email: 'anonymous2@gmail.com',
                    mobileno: '97498452',
                    password: 'Password12@',
                    company: 4,
                    usergroup: 3,
                    notificationgroups: [ { NotiGroupID: 35 }, { NotiGroupID: 1 } ],
                    active: true
                }                
            );
            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe("Please login first");
        });
    });
    describe('logged in as non admin', () => {
        test('should respond with 403 status code and appropriate message', async () => {
            const lastuser = await user.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'salesengineer@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put(`/api/user/${lastuser[0].UserID}`).set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'anonymous2',
                    email: 'anonymous2@gmail.com',
                    mobileno: '97498452',
                    password: 'Password12@',
                    company: 4,
                    usergroup: 3,
                    notificationgroups: [ { NotiGroupID: 35 }, { NotiGroupID: 1 } ],
                    active: true
                }
            );
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe("Only Admins can access this function");
        });
    });
    describe('empty form fields', () => {
        test('should respond with 400 status code and appropriate message', async () => {
            const lastuser = await user.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put(`/api/user/${lastuser[0].UserID}`).set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: '',
                    email: '',
                    mobileno: '',
                    password: '',
                    company: 4,
                    usergroup: 3,
                    notificationgroups: [ { NotiGroupID: 35 }, { NotiGroupID: 1 } ],
                    active: true
                }
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Please fill up all fields correctly");
        });
    });
    describe('no company selected', () => {
        test('should respond with 400 status code and appropriate message', async () => {
            const lastuser = await user.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put(`/api/user/${lastuser[0].UserID}`).set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'anonymous2',
                    email: 'anonymous2@gmail.com',
                    mobileno: '97498452',
                    password: 'Password12@',
                    company: null,
                    usergroup: 3,
                    notificationgroups: [ { NotiGroupID: 35 }, { NotiGroupID: 1 } ],
                    active: true
                }
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Please select the company the user belongs to");
        });
    });
    describe('no usergroup selected', () => {
        test('should respond with 400 status code and appropriate message', async () => {
            const lastuser = await user.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put(`/api/user/${lastuser[0].UserID}`).set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'anonymous2',
                    email: 'anonymous2@gmail.com',
                    mobileno: '97498452',
                    password: 'Password12@',
                    company: 4,
                    usergroup: null,
                    notificationgroups: [ { NotiGroupID: 35 }, { NotiGroupID: 1 } ],
                    active: true
                }       
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Please select a user group to assign the user to");
        });
    });
    describe('invalid email', () => {
        test('should respond with 400 status code and appropriate message', async () => {
            const lastuser = await user.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put(`/api/user/${lastuser[0].UserID}`).set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'anonymous2',
                    email: 'anonymous2@gmailcom',
                    mobileno: '97498452',
                    password: 'Password12@',
                    company: 4,
                    usergroup: 3,
                    notificationgroups: [ { NotiGroupID: 35 }, { NotiGroupID: 1 } ],
                    active: true
                }       
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Please enter a valid email");
        });
    });
    describe('invalid password', () => {
        test('should respond with 400 status code and appropriate message', async () => {
            const lastuser = await user.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put(`/api/user/${lastuser[0].UserID}`).set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'anonymous2',
                    email: 'anonymous2@gmail.com',
                    mobileno: '97498452',
                    password: 'password',
                    company: 4,
                    usergroup: 3,
                    notificationgroups: [ { NotiGroupID: 35 }, { NotiGroupID: 1 } ],
                    active: true
                }       
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Please choose a stronger password");
        });
    });
    describe('invalid phone no', () => {
        test('should respond with 400 status code and appropriate message', async () => {
            const lastuser = await user.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put(`/api/user/${lastuser[0].UserID}`).set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'anonymous2',
                    email: 'anonymous2@gmail.com',
                    mobileno: '123',
                    password: 'Password12@',
                    company: 4,
                    usergroup: 3,
                    notificationgroups: [ { NotiGroupID: 35 }, { NotiGroupID: 1 } ],
                    active: true
                }       
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Please enter a valid phone number");
        });
    });
    describe('duplicate email', () => {
        test('should respond with 422 status code and appropriate message', async () => {
            const lastuser = await user.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put(`/api/user/${lastuser[0].UserID}`).set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'anonymous2',
                    email: 'Admin@gmail.com',
                    mobileno: '97498452',
                    password: 'Password12@',
                    company: 4,
                    usergroup: 3,
                    notificationgroups: [ { NotiGroupID: 35 }, { NotiGroupID: 1 } ],
                    active: true
                }       
            );
            expect(response.statusCode).toBe(422);
            expect(response.body.message).toBe("User with that email already exists");
        });
    });
    describe('duplicate username', () => {
        test('should respond with 422 status code and appropriate message', async () => {
            const lastuser = await user.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put(`/api/user/${lastuser[0].UserID}`).set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'Admin',
                    email: 'anonymous2@gmail.com',
                    mobileno: '97498452',
                    password: 'Password12@',
                    company: 4,
                    usergroup: 3,
                    notificationgroups: [ { NotiGroupID: 35 }, { NotiGroupID: 1 } ],
                    active: true
                }       
            );
            expect(response.statusCode).toBe(422);
            expect(response.body.message).toBe("User with that username already exists");
        });
    });
    describe('all form fields valid', () => {
        test('should respond with 200 status code and return appropriate message', async () => {
            const lastuser = await user.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put(`/api/user/${lastuser[0].UserID}`).set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'anonymous2',
                    email: 'anonymous2@gmail.com',
                    mobileno: '97498452',
                    password: 'Password12@',
                    company: 4,
                    usergroup: 3,
                    notificationgroups: [ { NotiGroupID: 35 }, { NotiGroupID: 1 } ],
                    active: true
                }
            );
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('User updated successfully!');
        });
    });
});

describe('Delete User', () => {
    describe('not logged in', () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const lastuser = await user.getLastID();
            const response = await request(app).delete(`/api/user/${lastuser[0].UserID}`)
            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe("Please login first");
        });
    });
    describe('logged in as non admin', () => {
        test('should respond with 403 status code and appropriate message', async () => {
            const lastuser = await user.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'salesengineer@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).delete(`/api/user/${lastuser[0].UserID}`).set(
                'Authorization', `Bearer ${token}`,
            )
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe("Only Admins can access this function");
        });
    });
    describe('userid doesn\'t exist', () => {
        test('should respond with 404 status code and return appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).delete('/api/user/987654321').set(
                'Authorization', `Bearer ${token}`,
            )
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe('Cannot find User with that id');
        });
    });
    describe('user has outstanding tloans or rmas', () => {
        test('should respond with 405 status code and return appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).delete(`/api/user/3723`).set(
                'Authorization', `Bearer ${token}`,
            )
            expect(response.statusCode).toBe(405);
            expect(response.body.message).toBe('This user cannot be deleted as they have outstanding TLoans or RMAs');
        });
    });
    describe('userid is valid', () => {
        test('should respond with 200 status code and return appropriate message', async () => {
            const lastuser = await user.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).delete(`/api/user/${lastuser[0].UserID}`).set(
                'Authorization', `Bearer ${token}`,
            )
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('User deleted successfully!');
        });
    });
});


