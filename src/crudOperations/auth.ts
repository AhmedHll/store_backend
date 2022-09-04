import { RequestHandler } from 'express';
import userModel from '../models/userModel';

const User = new userModel('users');
const login: RequestHandler = async (req, res, next) => {
    // extract email, password from the body

    try {
        const { email, password } = req.body as { email: string; password: string };
        if (!email || !password || email === '' || password === '')
            throw new Error('email or password not valid');
        // check from database if the email >> print > "successes"
        const user = await User.getOne('email', email);
        // create token
        // compare password
        if (!user) throw new Error('no user exist with this email');
        const isPassword = await User.comparePassword(
            password,
            user.password as string
        );
        if (!isPassword) throw new Error('wrong password please try again');
        const token = User.createJwt({ id: user.id, email });
        res.cookie('token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });
        // response with data[user,token].
        res.status(200).json({ user });
        // compare password if valid , not > thro err
    } catch (error) {
        next(error);
    }
};
export default login;
