import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; // Import the DB connection function
import dotenv from 'dotenv';
import {clerkwebhooks} from './Controller/webhooks.js'
const app = express();
import companyRoutes from './Routes/companyRouter.js';
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './Routes/jobRoutes.js';
import usersRoutes from './Routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
dotenv.config();
// Routes
app.get('/', (req, res) => {
  res.send("API working");
});
app.post("/webhooks", express.text({ type: "*/*" }), clerkwebhooks);
<<<<<<< HEAD
app.use('/api/company',companyRoutes);
app.use('/api/jobs',jobRoutes);
app.use('/api/users',usersRoutes)
=======
>>>>>>> a1edce70c7241271cee1e040c9d082f723873c3b

//database connection status

await connectDB();
await connectCloudinary();

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
