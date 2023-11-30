# This is React js and Node js Project

This App Contain simple CRUD task with login System using JWT authentication and use redux persist to save the LogUser Data to localStorage

## Built With

- React Js
- Redux
- Node Js
- Express
- MYSQL

## Installation

1. Clone the repo

   ```sh
   git clone https://github.com/XxCodoxX/Student_Registration_System-CRUD-
   ```

2. Install NPM packages

   ```sh
   npm run install
   ```

3. Create .env file in server Root directory
4. Add thees keys to the server .env and use Your Config Data

   ```sh
   PORT = ''
   MYSQL_HOST = ''
   MYSQL_USER = ''
   MYSQL_PASSWORD = ''
   MYSQL_DB_NAME = ''
   JWT_AUTH_TOKEN = ''
   JWT_AUTH_REFRESH_TOKEN = ''
   JWT_AUTH_TOKEN_EXPTIME = ''
   JWT_AUTH_REFRESH_TOKEN_EXPTIME = ''
   ```

5. Create .env file in client Root directory
6. Add thees keys to the client .env and use Your Config Data

   ```sh
   VITE_BASE_URL = ''
   ```

7. Import given `users` Table to the MYSQL
   ```sh
   User Name = 'test 01'
   Password = '123'
   ```
8. Run the server

   ```sh
   cd ./server/
   npm run watch
   ```

9. run the client

   ```
   cd ./client/
   npm run dev
   ```
