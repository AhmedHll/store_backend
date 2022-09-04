import Model from '../Model';
import Product from '../../types/product.type';

let createdProduct: Product;

describe('Test Product Model Methods', () => {
    const productTest = new Model('products');
    it('Test Create Product Method', async () => {
        const result = await productTest.create({
            name: 'testProduct',
            price: 12314,
            category: 'tes1tCategory',
        });
        createdProduct = result;
        expect(result).toBeInstanceOf(Object);
    });

    it('Test getOne Product Method', async () => {
        const result = await productTest.getOne('id', createdProduct.id);
        expect(result).toBeInstanceOf(Object);
    });

    it('Test getAll Users Method', async () => {
        const result = await productTest.getAll();
        expect(result).toBeInstanceOf(Array);
    });

    it('Test updateOne Product Method', async () => {
        const result = await productTest.updateOne('' + createdProduct.id, {
            name: 'testProduct',
            price: 12314,
            category: 'tes1tCategory',
        });
        expect(result).toBeInstanceOf(Object);
    });

    it('Test deleteOne Method', async () => {
        const result = await productTest.deleteOne(
            createdProduct.id as unknown as string
        );
        expect(result).toBeInstanceOf(Object);
    });
});
