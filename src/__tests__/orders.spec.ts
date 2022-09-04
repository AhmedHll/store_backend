import Model from '../models/Model';
import supertest from 'supertest';
import app from '../server';
import jwt from 'jsonwebtoken';
import Order from '../types/order.type';
import userModel from '../models/userModel';
import User from '../types/user.type';
import Product from '../types/product.type';

const order = new Model('orders');
const user1 = new userModel('users');
const product1 = new Model('products');
let createdOrder: Order;
const request = supertest(app);

const newOrder = {
    status: 'active || not active',
    user_id: 1,
};

const token = jwt.sign(newOrder, process.env.TOKEN_SECRET as string, {
    expiresIn: '30d',
});

//Testing orders Endpoints
let createdUser: User;
let createdProduct: Product;

describe('Testing orders Endpoints.', () => {
    beforeAll(async () => {
        createdUser = await user1.create({
            first_name: 'firstTest',
            last_name: 'lastTest',
            email: 'test@gmail.com',
            password: '123123',
        });
        createdProduct = await product1.create({
            name: 'testProduct',
            price: 123,
            category: 'test',
        });
    });
    it('[POST] /api/orders - To create order with providing a token', async () => {
        const newOrder = {
            status: 'active',
            user_id: createdUser.id,
        };
        const response = await request
            .post('/api/orders')
            .send(newOrder)
            .set('Cookie', [`token=${token}`]);
        createdOrder = response.body.information;
        expect(response.status).toBe(200);
    });

    it('[PATCH] /api/orders/:id - [token require] ', async () => {
        const response = await request
            .patch(`/api/orders/${createdOrder.id}`)
            .send(newOrder);

        expect(response.status).toBe(401);
    });

    it('[PATCH] /api/orders/:id - To edit order by id with providing a token ', async () => {
        const response = await request
            .patch(`/api/orders/${createdOrder.id}`)
            .send(newOrder)
            .set('Cookie', [`token=${token}`]);
        expect(response.status).toBe(200);
    });

    it('[PATCH] /api/orders/:id - [token require] ', async () => {
        const response = await request
            .patch(`/api/orders/${createdOrder.id}`)
            .send(newOrder);
        expect(response.status).toBe(401);
    });

    it('[GET] /api/orders/:id - to get order by id with providing a token', async () => {
        const response = await request
            .get(`/api/orders/${createdOrder.id}`)
            .set('Cookie', [`token=${token}`]);
        expect(response.status).toBe(200);
    });

    it('[GET] /api/orders/:id - [token require]', async () => {
        const response = await request.get(`/api/orders/${createdOrder.id}`);
        expect(response.status).toBe(401);
    });

    it('[GET] /api/orders to - get orders with providing a token', async () => {
        const response = await request
            .get('/api/orders')
            .set('Cookie', [`token=${token}`]);
        expect(response.status).toBe(200);
    });

    it('[GET] /api/orders - [token require]', async () => {
        const response = await request.get('/api/orders');
        expect(response.status).toBe(401);
    });

    it('[DELETE] /api/orders/:id - To delete order by id with providing a token', async () => {
        const response = await request
            .delete(`/api/orders/${createdOrder.id}`)
            .send(newOrder)
            .set('Cookie', [`token=${token}`]);
        expect(response.status).toBe(200);
    });

    it('[DELETE] /api/orders/:id - [token require] ', async () => {
        const response = await request
            .patch(`/api/orders/${createdOrder.id}`)
            .send(newOrder);
        expect(response.status).toBe(401);
    });
});

let createdOrderProduct: Order;
describe('Testing orders-products - Endpoints.', () => {
    it('[POST] /api/orders - To create order with providing a token', async () => {
        const newOrder = {
            status: 'active',
            user_id: createdUser.id,
        };
        const response = await request
            .post('/api/orders')
            .send(newOrder)
            .set('Cookie', [`token=${token}`]);
        createdOrderProduct = response.body.information;
        expect(response.status).toBe(200);
    });

    it('[POST] /api/orders/:id/products - with providing a token ', async () => {
        const information = {
            product_id: createdProduct.id,
            quantity: '10',
        };
        const response = await request
            .post(`/api/orders/${createdOrderProduct.id}/products`)
            .send(information)
            .set('Cookie', [`token=${token}`]);
        expect(response.status).toBe(200);
    });

    it('[POST] /api/orders/:id/products - [token require] ', async () => {
        const information = {
            product_id: createdProduct.id,
            quantity: '10',
        };
        const response = await request
            .post(`/api/orders/${createdOrderProduct.id}/products`)
            .send(information);
        expect(response.status).toBe(401);
    });
});
