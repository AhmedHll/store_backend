import db from '../db';

type productOrders = {
    id: number;
    name: string;
    price: number;
    category: string;
}

class AddProductToOrder {
    constructor(public table: string) { }
    async addProduct(
        quantity: number,
        order_id: string,
        product_id: string
    ): Promise<productOrders> {
        try {
            const sql: string =
                'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const connection = await db.connect();
            const result = await connection.query(sql, [
                quantity,
                order_id,
                product_id,
            ]);
            const order = result.rows[0];
            connection.release();
            return order;
        } catch (error: unknown) {
            throw new Error(
                `Could not add product ${product_id} to order ${order_id}: ${error}`
            );
        }
    }
}

export default AddProductToOrder;