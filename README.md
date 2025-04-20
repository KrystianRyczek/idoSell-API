# IdoSell-API

IdoSell-API is a project developed during frontend and backend Developer rectrutation. 
This aplication offers acces to orders DB.
Aplication pull data from external API and saved it in DB.
Pullin data is shedulet one per day at 23:59:01
Aplicatin provide acces do order details. Aplication ednpoint's allow searching orders by filters like order ID or order wortch.




## 🌟 Work Load
Creat DB, setup DB acces, setup server conf.        | 2h
User routers development                            | 6h
Order routers development                           | 6h
Implementation of authorisation                     | 8h
Pulling data sheduling                              | 4h

## 🛠️ Technologies Used

| Backend       | Liblary's         |
|---------------|-------------------|
| Node.js       | express, nodemon  |
| JavaScript    | axios, bcrypt     |
|               | cross-env, dotenv |
|               | joi-password      |
|               | jsonwebtoken      |
|               | mongodb mongoose  |
|               | passport          |
|               | passport-jwt      |

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KrystianRyczek/idoSell-API
2. ** Navigate to the project directory:**
   ```bash
   cd IDOMODS-Forma-Sint
3. ** Install dependencies:**
   ```bash
   npm install
4. ** Creat .env fine and define varialbles:**
   ```bash
        DB_HOST=
        SECRET=
5. ** Run the project locally:**
   ```bash
   npm start