# API Requirements
These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index ([GET]: `http://localhost:3000/api/products`)
- Show ([GET]: `http://localhost:3000/api/products/:id`)
- Create ([POST]: `http://localhost:3000/api/products`)[token required]
- Update ([PATCH] `http://localhost:3000/api/products/:id`)[token required] 
- Delete ([DELETE] `http://localhost:3000/api/products/:id`) [token required] 

#### Users
- Index ([GET]: `http://localhost:3000/api/users`)[token required]
- Show ([GET]: `http://localhost:3000/api/users/:id`)[token required]
- Create ([POST]: `http://localhost:3000/api/users`)
- Update ([PATCH]: `http://localhost:3000/api/users/:id`) [token required]
- Delete ([DELETE]: `http://localhost:3000/api/users/:id`) [token required]

#### Orders
- Index ([GET]: `http://localhost:3000/api/orders`) [token required]
- Show ([GET]: `http://localhost:3000/api/orders/:id`) [token required]
- Create ([POST]: `http://localhost:3000/api/orders`) [token required]
- Update ([PATCH]: `http://localhost:3000/api/orders/:id`) [token required]
- Delete ([DELETE]: `http://localhost:3000/api/orders/:id`) [token required]

## Data Shapes
#### Product
```sql
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price numeric DEFAULT 0.00,
    category VARCHAR(50)
)
```

#### User
```sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);
```
#### Orders
```sql
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id BIGINT REFERENCES users(id));
```

### Product of each order
```sql
CREATE TABLE IF NOT EXISTS order_products(
id SERIAL PRIMARY KEY,
quantity INT,
order_id BIGINT REFERENCES orders(id) NOT NULL,
product_id BIGINT REFERENCES products(id) NOT NULL
);
``
