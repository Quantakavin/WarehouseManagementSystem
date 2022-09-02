import app from '../../index.js';
import userGroup from '../controllers/userGroupController';

const request = require('supertest');

describe('View All User Groups', () => {
    describe('not logged in', () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const response = await request(app).get('/api/usergroups')
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
            const response = await request(app).get('/api/usergroups').set(
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
            const response = await request(app).get('/api/usergroups').set(
                'Authorization', `Bearer ${token}`,
            );
            expect(response.header['content-type']).toEqual(expect.stringContaining('json'));
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBeGreaterThanOrEqual(0);
            if (response.body.length > 0) {
                const firstUserGroup = response.body[0]
                expect(firstUserGroup.UserGroupID).toBeDefined();
                expect(firstUserGroup.UserGroupName).toBeDefined();
                expect(firstUserGroup.UserGroupDesc).toBeDefined();
            }
        });
    });
});

describe('View User Group Information', () => {
    describe('not logged in', () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const response = await request(app).get('/api/usergroup/1')
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
            const response = await request(app).get('/api/usergroup/1').set(
                'Authorization', `Bearer ${token}`,
            );
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe("Only Admins can access this function");
        });
    });
    describe('logged in as admin and usergroupid doesn\t exist', () => {
        test('should respond with 404 status code and appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).get('/api/usergroup/987654321').set(
                'Authorization', `Bearer ${token}`,
            );
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe("Cannot find user group with that id");
        });
    });
    describe('logged in as admin and usergroupid exists', () => {
        test('should respond with 200 status code and appropriate data', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).get('/api/usergroup/1').set(
                'Authorization', `Bearer ${token}`,
            );
            expect(response.header['content-type']).toEqual(expect.stringContaining('json'));
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBeGreaterThanOrEqual(0);
            const firstUserGroup = response.body[0]
            expect(firstUserGroup.UserGroupName).toBeDefined();
            expect(firstUserGroup.UserGroupDesc).toBeDefined();
            expect(firstUserGroup.Features).toBeDefined();
        });
    });
});

describe('Add User Group', () => {
    describe('not logged in', () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const response = await request(app).post('/api/usergroup').send(
                {
                    name: 'usergrouptest',
                    description: '<p>This is a test</p>',
                    features: [
                        { FeatureID: 4, FeatureRightID: 2 },
                        { FeatureID: 6, FeatureRightID: 1 }
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
            const response = await request(app).post('/api/usergroup').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'usergrouptest',
                    description: '<p>This is a test</p>',
                    features: [
                        { FeatureID: 4, FeatureRightID: 2 },
                        { FeatureID: 6, FeatureRightID: 1 }
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
            const response = await request(app).post('/api/usergroup').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: '',
                    description: '',
                    features: [
                        { FeatureID: 4, FeatureRightID: 2 },
                        { FeatureID: 6, FeatureRightID: 1 }
                    ]
                }
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Please fill up all fields correctly");
        });
    });
    describe('all form fields valid', () => {
        test('should respond with 201 status code and return appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).post('/api/usergroup').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'usergrouptest',
                    description: '<p>This is a test</p>',
                    features: [
                        { FeatureID: 4, FeatureRightID: 2 },
                        { FeatureID: 6, FeatureRightID: 1 }
                    ]
                }
            );
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe('User Group created successfully!');
        });
    });
});

describe('Edit User Group', () => {
    describe('not logged in', () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const lastusergroup = await userGroup.getLastID();
            const response = await request(app).put(`/api/usergroup/${lastusergroup[0].UserGroupID}`).send(
                {
                    name: 'usergrouptest2',
                    description: '<p>This is a test 2</p>',
                    features: [
                        { FeatureID: 4, FeatureRightID: 3 },
                        { FeatureID: 11, FeatureRightID: 2 }
                    ]
                }
            );
            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe("Please login first");
        });
    });
    describe('logged in as non admin', () => {
        test('should respond with 403 status code and appropriate message', async () => {
            const lastusergroup = await userGroup.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'salesengineer@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put(`/api/usergroup/${lastusergroup[0].UserGroupID}`).set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'usergrouptest2',
                    description: '<p>This is a test 2</p>',
                    features: [
                        { FeatureID: 4, FeatureRightID: 3 },
                        { FeatureID: 11, FeatureRightID: 2 }
                    ]
                }
            );
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe("Only Admins can access this function");
        });
    });
    describe('empty form fields', () => {
        test('should respond with 400 status code and appropriate message', async () => {
            const lastusergroup = await userGroup.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put(`/api/usergroup/${lastusergroup[0].UserGroupID}`).set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: '',
                    description: '',
                    features: [
                        { FeatureID: 4, FeatureRightID: 3 },
                        { FeatureID: 11, FeatureRightID: 2 }
                    ]
                }
            );
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Please fill up all fields correctly");
        });
    });
    describe('usergroupid doesn\'t exist', () => {
        test('should respond with 404 status code and return appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put('/api/usergroup/987654321').set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'usergrouptest2',
                    description: '<p>This is a test 2</p>',
                    features: [
                        { FeatureID: 4, FeatureRightID: 3 },
                        { FeatureID: 11, FeatureRightID: 2 }
                    ]
                }
            );
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe('Cannot find user group with that id');
        });
    });
    describe('all form fields valid', () => {
        test('should respond with 200 status code and return appropriate message', async () => {
            const lastusergroup = await userGroup.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).put(`/api/usergroup/${lastusergroup[0].UserGroupID}`).set(
                'Authorization', `Bearer ${token}`,
            ).send(
                {
                    name: 'usergrouptest2',
                    description: '<p>This is a test 2</p>',
                    features: [
                        { FeatureID: 4, FeatureRightID: 3 },
                        { FeatureID: 11, FeatureRightID: 2 }
                    ]
                }
            );
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('User Group updated successfully!');
        });
    });
});

describe('Delete User Group', () => {
    describe('not logged in', () => {
        test('should respond with 401 status code and appropriate message', async () => {
            const lastusergroup = await userGroup.getLastID();
            const response = await request(app).delete(`/api/usergroup/${lastusergroup[0].UserGroupID}`)
            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe("Please login first");
        });
    });
    describe('logged in as non admin', () => {
        test('should respond with 403 status code and appropriate message', async () => {
            const lastusergroup = await userGroup.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'salesengineer@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).delete(`/api/usergroup/${lastusergroup[0].UserGroupID}`).set(
                'Authorization', `Bearer ${token}`,
            )
            expect(response.statusCode).toBe(403);
            expect(response.body.message).toBe("Only Admins can access this function");
        });
    });
    describe('usergroupid doesn\'t exist', () => {
        test('should respond with 404 status code and return appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).delete('/api/usergroup/987654321').set(
                'Authorization', `Bearer ${token}`,
            )
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe('Cannot find user group with that id');
        });
    });
    describe('user group contains users', () => {
        test('should respond with 405 status code and return appropriate message', async () => {
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).delete(`/api/usergroup/3`).set(
                'Authorization', `Bearer ${token}`,
            )
            expect(response.statusCode).toBe(405);
            expect(response.body.message).toBe('This user group cannot be deleted as it contains users');
        });
    });
    describe('usergroupid is valid', () => {
        test('should respond with 200 status code and return appropriate message', async () => {
            const lastusergroup = await userGroup.getLastID();
            const login = await request(app).post('/api/login').send({
                email: 'Admin@gmail.com',
                password: 'Password12@'
            });
            const token = login.body.token;
            const response = await request(app).delete(`/api/usergroup/${lastusergroup[0].UserGroupID}`).set(
                'Authorization', `Bearer ${token}`,
            )
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('User Group deleted successfully!');
        });
    });
});


