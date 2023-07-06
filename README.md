# node-mongoDB template

This is a sample CRUD application demonstrating how to build an Node.js express RESTful application that integrates with MongoDB. 
## Running the application

1. Clone the repo
2. Install dependencies: `npm install`
3. [Install and run MongoDB](https://www.mongodb.com/docs/manual/installation/) on your system. This repo works on an instance running on `localhost:27017`
4. Start the application: `nodemon app.js`

## Available routes

|Method | Route | Description |
| --- | --- | --- |
| GET | /books | Fetches all the books from db |
| GET | /book/:id | Fetches a book with objectid : id  |
| POST | /books | Add a new book |
| DELETE | /book/:id | Delete a book with objectid : id  |
| PATCH | /book/:id | Update a book with objectid : id  |
