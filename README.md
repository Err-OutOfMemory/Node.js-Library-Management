# Library Management System
This project is a Library Management System API built with Node.js and MySQL
## API
  - `/book` => Adding new book
  - `/books` => View books list
  - `/register` => Register 
  - `/login` => Log in and get token
  - `/borrow` => Borrow book
  - `/return`  => Return book

## Usage
- Connect to your MySql database in `config/database.js`
- `/register` req body JSON example :

  `{
  "name": "Jane",
  "email": "jane@example.com",
  "password": "password123",
  "isAdmin": true
}`
- `/login` req body JSON example :

  `{
  "email": "janedoe@example.com",
  "password": "password123"
}`

**Add token that respone from log in to header for usage API below**
- `/book` req body JSON example :

  `{
  "title": "The Catcher in the Rye",
  "author": "J.D. Salinger",
  "ISBN" : "9780316769488",
  "availableCopies" : 5
}`
- `/borrow` req body JSON example : `{"bookId": 2}`
- `/return` req body JSON example :`{"id": 6}`
