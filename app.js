const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connect = require('./db/db');
require('express-async-errors');

const PORT = process.env.PORT || 4000;

app.use(cors()); // Initialize CORS middleware
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/v1/contact', require('./routes/contact'));


// Error handling middleware
app.use(require('./middleware/notFound')); // Not found middleware
app.use(require('./middleware/errorMiddleware')); // Error middleware

// Start server and connect to DB
const start = async () => {
    try {
        await connect(process.env.MONGO_URI); // Connect to MongoDB
        app.listen(PORT, () => {
            console.log(`App is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

start();
