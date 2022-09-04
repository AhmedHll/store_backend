import Model from '../models/Model';
import supertest from 'supertest';
import app from '../server';
import jwt from 'jsonwebtoken';
import User from '../types/user.type';

const user = new Model('users');
const request = supertest(app);
let createdUser: User;

const newUser = {
    first_name: 'first',
    last_name: 'last',
    password: '12345678',
};

const token = jwt.sign(newUser, process.env.TOKEN_SECRET as string, {
    expiresIn: '30d',
});

//Testing Users Endpoints
describe('Testing Users Endpoints.', () => {
    it('[POST] /api/users - To create account', async () => {
        const newUser = {
            first_name: 'firstTest',
            last_name: 'lastName',
            email: 'test@gmail.com',
            password: 'test123',
        };
        const response = await request.post('/api/users').send(newUser);

        createdUser = response.body.information as User;
        expect(response.status).toBe(200);
    });

    it('[PATCH] /api/users/:id - To edit user account by id with providing a token ', async () => {
        const response = await request
            .patch(`/api/users/${createdUser.id}`)
            .send(newUser)
            .set('Cookie', [`token=${token}`]);
        expect(response.status).toBe(200);
    });

    it('[PATCH] /api/users/:id - [token require] ', async () => {
        const response = await request
            .patch(`/api/users/${createdUser.id}`)
            .send(newUser);
        expect(response.status).toBe(401);
    });

    it('[GET] /api/users/:id - to get user by id with providing a token', async () => {
        const response = await request
            .get(`/api/users/${createdUser.id}`)
            .set('Cookie', [`token=${token}`]);
        expect(response.status).toBe(200);
    });

    it('[GET] /api/users/:id - [token require]', async () => {
        const response = await request.get(`/api/users/${createdUser.id}`);
        expect(response.status).toBe(401);
    });

    it('[GET] /api/users - to get users with providing a token', async () => {
        const response = await request
            .get('/api/users')
            .set('Cookie', [`token=${token}`]);
        expect(response.status).toBe(200);
    });

    it('[GET] /api/users - [token require]', async () => {
        const response = await request.get('/api/users');
        expect(response.status).toBe(401);
    });

    it('[DELETE] /api/users/ - To delete user account by id with providing a token', async () => {
        const response = await request
            .delete(`/api/users/${createdUser.id}`)
            .send(newUser)
            .set('Cookie', [`token=${token}`]);
        expect(response.status).toBe(200);
    });

    it('[DELETE] /api/users/ - [token require]', async () => {
        const response = await request
            .delete(`/api/users/${createdUser.id}`)
            .send(newUser);
        expect(response.status).toBe(401);
    });
});
