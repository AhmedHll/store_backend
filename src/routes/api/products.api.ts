import { Router } from 'express';
import { createProduct, getProduct, getProducts, updateProduct, deleteProduct, } from '../../crudOperations/productCrud';
import authenticate from '../../handlers/authentication';

const routes = Router();

routes.route('/').get(getProducts).post(authenticate, createProduct);
routes.route('/:id').get(getProduct).patch(authenticate, updateProduct).delete(authenticate, deleteProduct);

export default routes;
