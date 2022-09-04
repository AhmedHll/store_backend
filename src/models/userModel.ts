import Model from './Model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class userModel extends Model {
    constructor(table: string) {
        super(table);
    }
    async comparePassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }
    // hash Password
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    // authenticate user
    createJwt(payload: string | object | Buffer) {
        return jwt.sign(payload, process.env.TOKEN_SECRET as string, {
            expiresIn: '30d',
        });
    }
}

export default userModel;
