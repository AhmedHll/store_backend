import Model from '../Model';
import User from '../../types/user.type';

let createdUser: User;

describe('Test User Model Methods', () => {
    const userTest = new Model('users');
    it('Test Create Method', async () => {
        const result = await userTest.create({
            email: 'testEmail@gmail.com',
            first_name: 'firstTest',
            last_name: 'lastTest',
            password: '123456',
        });
        createdUser = result;
        expect(result).toBeInstanceOf(Object);
    });

    it('Test getOne User Method', async () => {
        const result = await userTest.getOne('id', createdUser.id);
        expect(result).toBeInstanceOf(Object);
    });

    it('Test getAll Users Method', async () => {
        const result = await userTest.getAll();
        expect(result).toBeInstanceOf(Array);
    });

    it('Test updateOne User Method', async () => {
        const result = await userTest.updateOne('' + createdUser.id, {
            email: 'test@gmail.com',
            first_name: 'firstTest',
            last_name: 'lastTest',
            password: '123456',
        });
        expect(result).toBeInstanceOf(Object);
    });

    it('Test deleteOne Method', async () => {
        const result = await userTest.deleteOne(
            createdUser.id as unknown as string
        );
        expect(result).toBeInstanceOf(Object);
    });
});
