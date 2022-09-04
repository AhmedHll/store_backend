import Model from '../models/Model';
import supertest from 'supertest';
import app from '../server';
import jwt from 'jsonwebtoken';
import Product from '../types/product.type';

const product = new Model('products');
const request = supertest(app);
let createdProduct: Product;

const newProduct = {
    name: 'testProduct',
    price: 123,
    category: 'testCategory',
};

const token = jwt.sign(newProduct, process.env.TOKEN_SECRET as string, {
    expiresIn: '30d',
});

//Testing Products Endpoints
describe('Testing products Endpoints.', () => {
    it('[POST] /api/products - To create product with providing a token', async () => {
        const newProduct = {
            name: 'testProduct',
            price: 123,
            category: 'testCategory',
        };
        const response = await request
            .post('/api/products')
            .send(newProduct)
            .set('Cookie', [`token=${token}`]);
        createdProduct = response.body.information;
        expect(response.status).toBe(200);
    });

    it('[POST] /api/products - [token require]', async () => {
        const response = await request.post('/api/products').send(newProduct);
        expect(response.status).toBe(401);
    });

    it('[PATCH] /api/products/:id - To edit Product by id with providing a token', async () => {
        const response = await request
            .patch(`/api/products/${createdProduct.id}`)
            .send(newProduct)
            .set('Cookie', [`token=${token}`]);
        expect(response.status).toBe(200);
    });

    it('[PATCH] /api/products/:id - [token require] ', async () => {
        const response = await request
            .patch(`/api/products/${createdProduct.id}`)
            .send(newProduct);
        expect(response.status).toBe(401);
    });

    it('[GET] /api/products/:id - to get product by id', async () => {
        const response = await request.get(`/api/products/${createdProduct.id}`);
        expect(response.status).toBe(200);
    });

    it('[GET] /api/products - to get products', async () => {
        const response = await request.get('/api/products');
        expect(response.status).toBe(200);
    });

    it('[DELETE] /api/products/ - To delete product by id with providing a token', async () => {
        const response = await request
            .delete(`/api/products/${createdProduct.id}`)
            .send(newProduct)
            .set('Cookie', [`token=${token}`]);
        expect(response.status).toBe(200);
    });

    it('[DELETE] /api/products/ - [token require] ', async () => {
        const response = await request
            .delete(`/api/products/${createdProduct.id}`)
            .send(newProduct);
        expect(response.status).toBe(401);
    });
});
