import express from 'express';
import Model from '../models/Model';
const Order = new Model('orders');

// create Order is a first order in CRUD Operations 'Create'
const createOneOrder: express.RequestHandler = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
        const order = await Order.create(req.body);
        //we can use res.send(order);
        // i prefer use .json to provide more details  and information and the ability to interactive with objects
        //res.send(order);
        res.json({ case: 'success', information: { ...order }, NB: `Your order with id ${order.id} is ready to go 🚕` });
        // if (!order.price) {
        //   throw new Error('All filed is required ');
        // }
    } catch (error: unknown) {
        next(error);
    }
};

// get all orders is a second order in CRUD Operations 'Read'
const getOrders: express.RequestHandler = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const order = await Order.getAll();
        res.json({ case: 'success', information: order, NB: 'This is all orders you asked  🚞🪂' });
    } catch (error: unknown) {
        next(error);
    }
};

// get specific order 'this is not required in the project'.
const getOrder = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const id = req.params.id;
        const specificOrder = await Order.getOne('id', req.params.id);
        if (!specificOrder) {
            throw new Error(`This Order by id:${id} is not exist 🤔`);
        }
        const order = await Order.getOne('id', req.params.id);
        res.json({ case: 'success', information: order, NB: 'This is specific order you asked 🛴' });
    } catch (error: unknown) {
        next(error);
    }
};

// update Order is the third order in CRUD Operations 'Update', 'this is not required in the project'.
const updateOrder = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
        const id = req.params.id;
        const updated = await Order.updateOne(id, req.body);
        if (!updated) {
            throw new Error(`this order with id:${id} is not exist to update it `);
        }
        const update = await Order.updateOne(id, req.body);
        res.json({ case: 'success', information: update, NB: 'Done Update The Order  ✈' });
    } catch (error: unknown) {
        next(error);
    }
};

// delete order is the forth order in CRUD Operations 'Delete'
const deleteOrder = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id: string = req.params.id;
    try {
        const deleteOrder = await Order.deleteOne(req.params.id as unknown as string);
        if (!deleteOrder) {
            throw new Error(`this order with id:${id} is not exist to delete it `);
        }
        res.json({ case: 'success', information: deleteOrder, NB: 'The Order Is Deleted now ❌' });
    } catch (error: unknown) {
        next(error);
    }
};

export {
    createOneOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder,
};
