
# Cluckr

## About
 - Cluckr is like Twitter but instead of tweets, there's clucks.
 - Made using PostgreSQL, knex.js and Node


## Initial Setup
- Clone this repository
- Initialize npm (npm init)
- Install all packages listed in package.json 


## Running packages
- Copy the knexfile.js, run command knex init and replace the new knexfile with the copied one.
- Create a database and add its name to the database key in the knexfile
- Run knex migrate:latest to load the migrations
- Run command nodemon app.js

- Go to localhost:3000

- Sit back and make some clucks

