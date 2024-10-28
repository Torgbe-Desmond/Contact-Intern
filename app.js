const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connect = require('./db/db');
require('express-async-errors');

const PORT = process.env.PORT ||  4000 

app.use(cors);
app.use(express.json());

app.use('/api/v1/contact', require('./routes/contact'));

// error middlewares
app.use(require('./middleware/errorMiddleware'));
app.use(require('./middleware/notFound'))

const start= async()=>{
    await connect(process.env.MONGO_URI)
    app.listen(PORT,()=>{
        console.log(`App is running on port ${PORT}`)
    })
}   

start()

// The uri is private so i will not show it here