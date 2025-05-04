import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; // Import the DB connection function
import dotenv from 'dotenv';
import {clerkwebhooks} from './Controller/webhooks.js'
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();
// Routes
app.get('/', (req, res) => {
  res.send("API working");
});
app.post('/webhooks',clerkwebhooks)

//database connection status

await connectDB();

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
