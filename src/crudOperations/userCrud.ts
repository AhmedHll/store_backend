import express from 'express';
import userModel from '../models/userModel';

const User = new userModel('users');


// create user is a first order in CRUD Operations 'Create'
const createNewUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const hashedPassword = await User.hashPassword(req.body.password);
        req.body.password = hashedPassword;
        const user = await User.create(req.body);
        if (!user) {
            throw new Error('All filed is required ');
        }

        //we can use res.send(user);
        // i prefer use .json to provide more details  and information and the ability to interactive with objects

        //res.send(user);
        res.json({
            case: 'success',
            information: { ...user },
            NB: `Hello ${user.first_name} your id is id:${user.id}`,
        });
    } catch (error: unknown) {
        next(error);
    }
};

// get all users is a second order in CRUD Operations 'Read'
const getUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const users = await User.getAll();
        res.json({
            case: 'success',
            information: users,
            NB: `You have ${users.length} of active users your database 👨‍👨‍👧‍👧`,
        });
    } catch (error: unknown) {
        next(error);
    }
};

// get specific user 'this is not required in the project'.
const getUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const id: string = req.params.id;
        const user = await User.getOne('id', req.params.id);
        if (!user) {
            throw new Error(`This user by id:${id} is not exist to update it 🤔`);
        }
        res.json({
            case: 'success',
            information: user,
            NB: `here you got user with id:${user.id} 😀`,
        });
    } catch (error: unknown) {
        next(error);
    }
};

// update user is the third order in CRUD Operations 'Update', 'this is not required in the project'.
const updateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id: string = req.params.id;
    try {
        const update = await User.updateOne(id, req.body);
        if (!update) {
            throw new Error(`This user by id:${id} is not exist to update it 🤔`);
        }
        res.json({
            case: 'success',
            information: update,
            NB: `user with id:${id} have changed information ✅`,
        });
    } catch (error: unknown) {
        next(error);
    }
};

// delete user is the forth order in CRUD Operations 'Delete'
const deleteUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const id: string = req.params.id;
        const deleteUser = await User.deleteOne(req.params.id as unknown as string);
        if (!deleteUser) {
            throw new Error(`This user by id:${id} is not exist to delete it 🤔`);
        }
        res.json({
            case: 'success',
            information: deleteUser,
            NB: `user with id:${id} not here anymore  'deleted❌'`,
        });
    } catch (error: unknown) {
        next(error);
    }
};

export { createNewUser, getUser, getUsers, deleteUser, updateUser };
