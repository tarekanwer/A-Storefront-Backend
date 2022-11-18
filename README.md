# Storefront Backend Project

## Getting Started

This project is a part of FWD advanced track web development. The project aims to build a backend APIs that is used to handle products , orders and users of a store front. The APIs are built using NodeJS and Express. The databases' critical data is encrypted. Moreover, the endpoints are authenticated using JWTs.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Set up and scripts

- `npm install` to install all dependencies
- `npm start` : to spin the server
- `npm test` : to run the tests

## ENV variables

- add a `.env` file in the root directory and set the missing `###` environment parameters

```
POSTGRES_HOST= 'localhost'
POSTGRES_DB = 'dev'
POSTGRES_DB_test ='test'
POSTGRES_USER= ###
POSTGRES_PASSWORD = ###
Port = '6000'
ENV=test
BCRYPT_PASSWORD=###
SALT_ROUNDS=###
TOKEN_SECRET=###
```

### 1. DB Creation and Migrations

Databases was built using postgresSQL having 3 databases :

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

any sensitive information is hashed with bcrypt.

the database are run on Port 6000 as mentioned in the env variables.

databases are migrated up using the following script : ```db-migrate up``` on the other hand to migrate databases down we use the following script ```db-migrate down```

To setup the database the following steps should be followed : 
1 - To have PostgreSql on the computer
2 using psql we setup our database for development and testing using the following command 
``` 
CREATE DATABASE dev; 
``` 
3 - To delete the database you can use the following command : 
```
DROP DATABASE dev;
``` 

### 2. Models

Models are built based on the databases having 3 databases : products , orders and users. having CRUD actions :

- **Example** index to get all rows regarding database
- **Example** show to get certain instance
- **Example** create to init a instance
- **Example** delete to remove certain instance

### 3. Express Handlers

Express handlers are made upon each model : products , orders and users. having 4 routes each following the example shown below.

- **Example**: A INDEX route: '/orders' [GET]
- **Example**: A SHOW route: '/orders/:id' [GET]
- **Example**: A CREATE route: '/orders' [POST]
- **Example**: A DELETE route: '/orders/:id' [DELETE]

any sensitive information was protected using JWT methods.

### 4. test (Jasmine)

there are 2 types of tests made for this project : end to end and model tests to ensure that every piece of code is made trully.
while having to many test in the project there are some suggestions made testing process go as expected :
- it is also recommended to have the database cleared before each test.
- it is needed to have random spec to false on jasmine support.


## Test the app

- add a `database.json` file in the root directory and set the missing `###` parameters

```
{
  "dev": {
    "driver": "pg",
    "host": "localhost",
    "database": "dev",
    "user": ###,
    "password": ###,
    "port": "6000"
  },
  "test": {
    "driver": "pg",
    "host": "localhost",
    "database": "test",
    "user": ###,
    "password": ###,
    "port": "6000"
  }
}
```
