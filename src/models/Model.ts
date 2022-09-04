import db from '../db';

type MainModel = {
    id: number;
    email: string;
    information: string;
    firstName: string;
    lastName: string;
    first_name: string;
    last_name: string;
    password: string;

    name: string;
    price: number;
    category: string;

    status: string;
    user_id: number;

}
class Model {
    constructor(public table: string) { }

    //'Create' Stand For 'C' in CRUD Operations 
    async create(user: Object): Promise<MainModel> {
        try {
            const connection = await db.connect();
            const information = Object.keys(user);
            const sql: string = `INSERT INTO ${this.table} (${information.join(',')})
        values (${Array.from(
                { length: information.length },
                (e, i) => `$${i + 1}`
            )}) returning *`;
            const result = await connection.query(sql, Object.values(user));
            connection.release();
            return result.rows[0];
        } catch (error: unknown) {
            throw new Error(`Unable to create ${this.table.slice(0, -1)}`);
        }
    }

    //'Read' Stand For 'R' in CRUD Operations 
    async getAll(): Promise<MainModel[]> {
        try {
            const connection = await db.connect();
            const sql: string = `SELECT * FROM ${this.table}`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error: unknown) {
            throw new Error(
                `Unable to get ${this.table}: ${(error as Error).message}`
            );
        }
    }

    // get specific thing 'this is not required in the project'.
    async getOne(id: string, value: string | number | undefined): Promise<MainModel> {
        try {
            const connection = await db.connect();
            const sql: string = `SELECT * FROM ${this.table} WHERE ${id}=($1)`;
            const result = await connection.query(sql, [value]);
            connection.release();
            return result.rows[0];
        } catch (error: unknown) {
            throw new Error(
                `Unable to get ${this.table.slice(0, -1)}:${id}, ${(error as Error).message
                }`
            );
        }
    }

    //'Update' Stand For 'U' in CRUD Operations , 'this is not required in the project'.
    // I use type 'any' because it's dynamic model it can take any deferent type.
    async updateOne(id: string, u: any): Promise<MainModel> {
        try {
            const connection = await db.connect();
            const sql: string = `
      UPDATE ${this.table}
      SET ${Object.keys(u)
                    .map((e, i) => `${e}=$${i + 1}`)
                    .join(',')}
      WHERE id=${id}
      RETURNING *`;
            const result = await connection.query(sql, Object.values(u));
            connection.release();
            return result.rows[0];
        } catch (error: unknown) {
            throw new Error(
                `Unable to update ${this.table.slice(0, -1)}:${u.firstName} ${u.lastName
                }, ${(error as Error).message} `
            );
        }
    }

    //'Delete' Stand For 'D' in CRUD Operation.
    async deleteOne(id: string): Promise<MainModel> {
        try {
            const connection = await db.connect();
            const sql: string = `DELETE FROM ${this.table}
      WHERE id=$1
      RETURNING *`;
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error: unknown) {
            throw new Error(`Unable to delete ${this.table.slice(0, -1)}: ${id}, ${(error as Error).message
                };
    )`);
        }
    }
}
export default Model;
