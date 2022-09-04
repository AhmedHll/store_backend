import Model from '../Model';
import Order from '../../types/order.type';
import User from '../../types/user.type';

let createdOrder: Order;
let createdUser: User;

describe('Test Orders Model Methods', () => {
    const orderTest = new Model('orders');
    const userTest = new Model('users');

    it('Test Create Order Method', async () => {
        const result1 = await userTest.create({
            email: 'testEmail@gmail.com',
            first_name: 'firstTest',
            last_name: 'lastTest',
            password: '123456',
        });
        createdUser = result1;
        const result = await orderTest.create({
            status: 'active',
            user_id: result1.id,
        });
        createdOrder = result;
        expect(result).toBeInstanceOf(Object);
    });

    it('Test getOne Order Method', async () => {
        const result = await orderTest.getOne('id', createdOrder.id);
        expect(result).toBeInstanceOf(Object);
    });

    it('Test getAll Orders Method', async () => {
        const result = await orderTest.getAll();
        expect(result).toBeInstanceOf(Array);
    });

    it('Test updateOne Order Method', async () => {
        const result1 = await userTest.create({
            email: 'testEmail@gmail.com',
            first_name: 'firstTest',
            last_name: 'lastTest',
            password: '123456',
        });
        createdUser = result1;
        const result = await orderTest.updateOne('' + createdOrder.id, {
            status: 'active',
            user_id: result1.id,
        });
        expect(result).toBeInstanceOf(Object);
    });

    it('Test deleteOne Method', async () => {
        const result = await orderTest.deleteOne(
            createdOrder.id as unknown as string
        );
        expect(result).toBeInstanceOf(Object);
    });
});
