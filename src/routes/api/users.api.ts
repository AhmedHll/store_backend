import { Router } from 'express';
import login from '../../crudOperations/auth';
import { createNewUser, getUser, getUsers, updateUser, deleteUser, } from '../../crudOperations/userCrud';
import authenticate from '../../handlers/authentication';

const routes = Router();

routes.route('/').get(authenticate, getUsers).post(createNewUser);
routes.route('/:id').get(authenticate, getUser).patch(authenticate, updateUser).delete(authenticate, deleteUser);

routes.route('/auth').post(login);
export default routes;
