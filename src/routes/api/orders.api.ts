import { Router } from 'express';
import { createOneOrder, deleteOrder, getOrders, getOrder, updateOrder } from '../../crudOperations/orderCrud';
import addProduct from '../../crudOperations/orderProductsCrud';
import authenticate from '../../handlers/authentication';

const routes = Router();

routes.route('/').get(authenticate, getOrders).post(authenticate, createOneOrder);
routes.route('/:id').get(authenticate, getOrder).patch(authenticate, updateOrder).delete(authenticate, deleteOrder);
routes.route('/:id/products').post(authenticate, addProduct);
export default routes;
