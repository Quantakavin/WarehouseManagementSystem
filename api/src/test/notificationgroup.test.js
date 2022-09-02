import app from '../../index.js';
import notificationGroup from '../controllers/notificationGroupController';

const request = require('supertest');

describe('View All Notification Groups', () => {
    describe('not logged in', () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const response = await request(app).get('/api/notificationgroups')
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
            const response = await request(app).get('/api/notificationgroups').set(
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
            const response = await request(app).get('/api/notificationgroups').set(
                'Authorization', `Bearer ${token}`,
            );
            expect(response.header['content-type']).toEqual(expect.stringContaining('json'));
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBeGreaterThanOrEqual(0);
            if (response.body.length > 0) {
                const firstNotiGroup = response.body[0]
                expect(firstNotiGroup.NotiGroupID).toBeDefined();
                expect(firstNotiGroup.NotiGroupName).toBeDefined();
                expect(firstNotiGroup.NotiGroupDesc).toBeDefined();
            }
        });
    });
});

describe('View Notification Group Information', () => {
    describe('not logged in', () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const response = await request(app).get('/api/notificationgroup/1')
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
            const response = await request(app).get('/api/notificationgroup/1').set(
                'Authorization', `Bearer ${token}`,
            );
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe("Only Admins can access this function");
        });
    });
    describe('logged in as admin and notificationgroupid doesn\t exist', () => {
        test('should respond with 404 status code and appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).get('/api/notificationgroup/987654321').set(
                'Authorization', `Bearer ${token}`,
            );
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe("Cannot find notification group with that id");
        });
    });
    describe('logged in as admin and notificationgroupid exists', () => {
        test('should respond with 200 status code and appropriate data', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).get('/api/notificationgroup/1').set(
                'Authorization', `Bearer ${token}`,
            );
            expect(response.header['content-type']).toEqual(expect.stringContaining('json'));
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBeGreaterThanOrEqual(0);
            const firstNotiGroup = response.body[0]
            expect(firstNotiGroup.NotiGroupName).toBeDefined();
            expect(firstNotiGroup.NotiGroupDesc).toBeDefined();
            expect(firstNotiGroup.CompanyName).toBeDefined();
            expect(firstNotiGroup.CompanyID).toBeDefined();
            expect(firstNotiGroup.Features).toBeDefined();
        });
    });
});

describe('Add Notification Group', () => {
    describe('not logged in', () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const response = await request(app).post('/api/notificationgroup').send(
                {
                    name: 'testnotigroup',
                    company: 5,
                    description: '<p>testing</p>',
                    notifications: [
                        { NotiFeatureID: 10, NotiTypeID: 1 },
                        { NotiFeatureID: 20, NotiTypeID: 2 }
                    ]
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
            const response = await request(app).post('/api/notificationgroup').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'testnotigroup',
                    company: 5,
                    description: '<p>testing</p>',
                    notifications: [
                        { NotiFeatureID: 10, NotiTypeID: 1 },
                        { NotiFeatureID: 20, NotiTypeID: 2 }
                    ]
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
            const response = await request(app).post('/api/notificationgroup').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: '',
                    company: 5,
                    description: '',
                    notifications: [
                        { NotiFeatureID: 10, NotiTypeID: 1 },
                        { NotiFeatureID: 20, NotiTypeID: 2 }
                    ]
                }
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Please fill up all fields correctly");
        });
    });
    describe('no company selected', () => {
        test('should respond with 400 status code and return appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).post('/api/notificationgroup').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'testnotigroup',
                    company: null,
                    description: '<p>testing</p>',
                    notifications: [
                        { NotiFeatureID: 10, NotiTypeID: 1 },
                        { NotiFeatureID: 20, NotiTypeID: 2 }
                    ]
                }
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('Please select a company to assign the notification group to');
        });
    });
    describe('all form fields valid', () => {
        test('should respond with 201 status code and return appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).post('/api/notificationgroup').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'testnotigroup',
                    company: 5,
                    description: '<p>testing</p>',
                    notifications: [
                        { NotiFeatureID: 10, NotiTypeID: 1 },
                        { NotiFeatureID: 20, NotiTypeID: 2 }
                    ]
                }
            );
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe('Notification Group created successfully!');
        });
    });
});

describe('Edit Notification Group', () => {
    describe('not logged in', () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const lastnotigroup = await notificationGroup.getLastID();
            const response = await request(app).put(`/api/notificationgroup/${lastnotigroup[0].NotiGroupID}`).send(
                {
                    name: 'testnotigroup2',
                    company: 2,
                    description: '<p>testing2</p>',
                    notifications: [
                        { NotiFeatureID: 10, NotiTypeID: 2 },
                        { NotiFeatureID: 20, NotiTypeID: 2 }
                    ]
                }
            );
            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe("Please login first");
        });
    });
    describe('logged in as non admin', () => {
        test('should respond with 403 status code and appropriate message', async () => {
            const lastnotigroup = await notificationGroup.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'salesengineer@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put(`/api/notificationgroup/${lastnotigroup[0].NotiGroupID}`).set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'testnotigroup2',
                    company: 2,
                    description: '<p>testing2</p>',
                    notifications: [
                        { NotiFeatureID: 10, NotiTypeID: 2 },
                        { NotiFeatureID: 20, NotiTypeID: 2 }
                    ]
                }
            );
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe("Only Admins can access this function");
        });
    });
    describe('empty form fields', () => {
        test('should respond with 400 status code and appropriate message', async () => {
            const lastnotigroup = await notificationGroup.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put(`/api/notificationgroup/${lastnotigroup[0].NotiGroupID}`).set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: '',
                    company: 2,
                    description: '',
                    notifications: [
                        { NotiFeatureID: 10, NotiTypeID: 2 },
                        { NotiFeatureID: 20, NotiTypeID: 2 }
                    ]
                }
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Please fill up all fields correctly");
        });
    });
    describe('no company selected', () => {
        test('should respond with 400 status code and return appropriate message', async () => {
            const lastnotigroup = await notificationGroup.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put(`/api/notificationgroup/${lastnotigroup[0].NotiGroupID}`).set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'testnotigroup2',
                    company: null,
                    description: '<p>testing2</p>',
                    notifications: [
                        { NotiFeatureID: 10, NotiTypeID: 2 },
                        { NotiFeatureID: 20, NotiTypeID: 2 }
                    ]
                }
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('Please select a company to assign the notification group to');
        });
    });
    describe('NotiGroupID doesn\'t exist', () => {
        test('should respond with 404 status code and return appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put('/api/notificationgroup/987654321').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'testnotigroup2',
                    company: 2,
                    description: '<p>testing2</p>',
                    notifications: [
                        { NotiFeatureID: 10, NotiTypeID: 2 },
                        { NotiFeatureID: 20, NotiTypeID: 2 }
                    ]
                }
            );
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe('Cannot find notification group with that id');
        });
    });
    describe('all form fields valid', () => {
        test('should respond with 200 status code and return appropriate message', async () => {
            const lastnotigroup = await notificationGroup.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put(`/api/notificationgroup/${lastnotigroup[0].NotiGroupID}`).set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'testnotigroup2',
                    company: 2,
                    description: '<p>testing2</p>',
                    notifications: [
                        { NotiFeatureID: 10, NotiTypeID: 2 },
                        { NotiFeatureID: 20, NotiTypeID: 2 }
                    ]
                }
            );
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Notification Group updated successfully!');
        });
    });
});

describe('Delete Notification Group', () => {
    describe('not logged in', () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const lastnotigroup = await notificationGroup.getLastID();
            const response = await request(app).delete(`/api/notificationgroup/${lastnotigroup[0].NotiGroupID}`)
            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe("Please login first");
        });
    });
    describe('logged in as non admin', () => {
        test('should respond with 403 status code and appropriate message', async () => {
            const lastnotigroup = await notificationGroup.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'salesengineer@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).delete(`/api/notificationgroup/${lastnotigroup[0].NotiGroupID}`).set(
                'Authorization', `Bearer ${token}`,
            )
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe("Only Admins can access this function");
        });
    });
    describe('NotiGroupID doesn\'t exist', () => {
        test('should respond with 404 status code and return appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).delete('/api/notificationgroup/987654321').set(
                'Authorization', `Bearer ${token}`,
            )
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe('Cannot find notification group with that id');
        });
    });
    describe('notification group contains users', () => {
        test('should respond with 405 status code and return appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).delete(`/api/notificationgroup/3`).set(
                'Authorization', `Bearer ${token}`,
            )
            expect(response.statusCode).toBe(405);
            expect(response.body.message).toBe('This Notification group cannot be deleted as it contains users');
        });
    });
    describe('notigroupid is valid', () => {
        test('should respond with 200 status code and return appropriate message', async () => {
            const lastnotigroup = await notificationGroup.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).delete(`/api/notificationgroup/${lastnotigroup[0].NotiGroupID}`).set(
                'Authorization', `Bearer ${token}`,
            )
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Notification Group deleted successfully!');
        });
    });
});