import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

const authenticate = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new Error('Token require');
        const payload = jwt.verify(token, process.env.TOKEN_SECRET as string);
        if (!payload) throw new Error('Authentication failed');
        req.user = payload as object;
        next();
    } catch (error) {
        next(error);
    }
};

export default authenticate;
