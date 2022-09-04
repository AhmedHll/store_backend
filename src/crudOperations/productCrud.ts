import express from 'express';
import Model from '../models/Model';
const Product = new Model('products');

// create Product is a first order in CRUD Operations 'Create'
const createProduct: express.RequestHandler = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const product = await Product.create(req.body);

        // if (product.hasOwnProperty('price')) {
        // } else {
        //   throw new Error('Please provide the price of product ');
        // }

        //we can use res.send(product);
        // i prefer use .json to provide more details  and information and the ability to interactive with objects
        //res.send(product);
        res.json({
            case: 'success',
            information: { ...product },
            NB: `you have add new Product:${product.name} with id:${product.id} to the shope ✔`,
        });

    } catch (error: unknown) {
        // throw new Error(`Please provide all properties`);
        next(error);
    }
};

// get all Products is a second order in CRUD Operations 'Read'
const getProducts: express.RequestHandler = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const product = await Product.getAll();
        res.json({
            case: 'success',
            information: product,
            NB: `you have ${product.length} products in your shope ⚓`,
        });
    } catch (error: unknown) {
        next(error);
    }
};

// get specific Product 'this is not required in the project'.
const getProduct = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id: string = req.params.id;
    try {
        const product = await Product.getOne('id', req.params.id);
        if (!product) {
            throw new Error(`This product is by id:${id} not exist to delete it 🤔`);
        }
        res.json({
            case: 'success',
            information: product,
            NB: `here your product:${product.name} 🛴`,
        });
    } catch (error: unknown) {
        next(error);
    }
};

// update Product is the third order in CRUD Operations 'Update', 'this is not required in the project'.
const updateProduct = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id: string = req.params.id;
    try {
        const update = await Product.updateOne(id, req.body);
        if (!update) {
            throw new Error(`This product by id:${id} is not exist to update it 🤔`);
        }
        res.json({
            case: 'success',
            information: update,
            NB: `the  information for product:${update.name} changed ✈`,
        });
    } catch (error: unknown) {
        next(error);
    }
};

// delete Product is the forth order in CRUD Operations 'Delete'
const deleteProduct = async (req: express.Request, res: express.Response, next: express.NextFunction
) => {
    try {
        const deleteProduct = await Product.deleteOne(
            req.params.id as unknown as string
        );
        res.json({
            case: 'success',
            information: deleteProduct,
            NB: `the product:${deleteProduct.name} is not here anymore ❌`,
        });
    } catch (error: unknown) {
        next(error);
    }
};
export { createProduct, getProduct, getProducts, deleteProduct, updateProduct };
