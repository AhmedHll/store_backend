import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
interface RequestWithUser extends Request {
    user?: {
        id: string, email: string
    }
}
const authenticate = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new Error('Token require');
        const payload = jwt.verify(token, process.env.TOKEN_SECRET as string);
        if (!payload) throw new Error('Authentication failed');
        req.user = payload as { id: string, email: string };
        next();
    } catch (error) {
        next(error);
    }
};

export default authenticate;
