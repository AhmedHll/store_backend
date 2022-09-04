##  Plan to Meet Requirements (Endpoints & Database Schema)

In this repo there is a [REQUIREMENTS.md](./REQUIREMENTS.md) document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend.

## Table of contents

- [Required Technologies](#Required-Technologies)
- [Package installation](#Package-installation)
- [Environmental Variables](#Environmental-Variables)
- [Scripts Used](#Scripts-Used)
- [Database Creation](#Database-Creation)
- [Database Migrations](#Database-Migrations)
- [Resources](#Resources)
- [Author](#author)


## Required Technologies
- PostgreSQL - for the database
- Visual Studio Code - Code Editing
- Postman - API Platform

## Package installation
``
run -> npm install 
``
#### Dependencies
```sh
npm i express --- Node.js web app framework
npm i pg --- PostgreSQL client
npm i bcrypt --- Password hashing
npm i dotenv --- Load environment variables
npm i jsonwebtoken --- JSON web tokens
npm i cookie-parser
npm i cors
npm i db-migrate
npm i db-migrate-pg
npm i nodemon
npm i ts-node
```
#### Dev Dependencies
```sh
npm i -D typescript --- typescript
npm i -D eslint-plugin-prettier --- Run prettier as an eslint rule
npm i -D ts-node --- Typescript node.js
npm i -D supertest --- HTTP testing
npm i -D jasmine --- Jasmine unit testing
npm i -D prettier --- Code formatting
npm i -D eslint
npm i -D eslint-config-prettier --- Disable conflicting eslint rules
npm i -D eslint-plugin-prettier
npm i -D jasmine-spec-reporter ---  Jasmine test output formatting
npm i -D nodemon --- Monitor files & auto restart node
npm i -D dotenv -- for Environmental Variables
# Types for typescript support
npm -i -D @types/bcrypt
npm -i -D @types/cookie-parser
npm -i -D @types/cors
npm -i -D @types/express
npm -i -D @types/jsonwebtoken
npm -i -D @types/supertest
npm -i -D @typescript-eslint/eslint-plugin
npm -i -D @types/jasmine
npm -i -D @types/pg
npm -i -D @typescript-eslint/parser
```

## Environmental Variables

> For database connection & authentication information - Create `.env` file then but this Variables inside it.
- PORT=3000
- POSTGRES_HOST=localhost
- POSTGRES_PORT=5432
- POSTGRES_DB=store_dev
- POSTGRES_DB_TEST=store_test
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=postgres
- ENV=dev
- BCRYPT_PASSWORD=ahmedhall
- SALT_ROUNDS=10
- TOKEN_SECRET=ahmed

## Scripts Used
| todo | run | 
| :--- | :---- | 
| To Compile & run the server | npm run start |
| Set db to dev & start server with nodemon | npm run dev | 
| prettier | npm run format |
| lint| npm run lint|
| Set db on test and migration up then run jasmine tests| npm run test |

##  Database Creation
```sh
# create user
CREATE USER postgres WITH PASSWORD 'postgres';
# create Database
CREATE DATABASE store_dev;
CREATE DATABASE store_test;
# connect to database
\c store_dev;
```

## Database Migrations
```sh
# to create the same data schema run this command to create all tables 
"npm run migrate-up"
# to drop the data schema tables run this command to drop each table separately
"npm run migrate-down"
# to reset the data schema tables run this command
"npm run migrate-reset"
# Migrations used in this repo
db-migrate create users--sql-file
db-migrate create products --sql-file
db-migrate create orders --sql-file
db-migrate create order_products --sql-file
```

## Screenshots from pass all spec testes:
![](/screenshots/1.png) ![](/screenshots/2.png) ![](/screenshots/3.png)


## Resources 
- https://github.com/HossamAbubakr/Udacity-Full-Stack-Classroom
- https://www.tabnine.com/code/javascript/functions/express/Response/status
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
- https://www.npmjs.com/

## Author
- Ahmed Hall - Backend Developer -  [@linkedin](https://www.linkedin.com/in/ahmed-hall/)


