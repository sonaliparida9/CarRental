import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRouter.js';
import bookingRouters from './routes/bookingRoutes.js';

// initialize expree App
const app = express();

// connect to database
await connectDB()

// middeleware
app.use(cors());
app.use(express.json());

// routes
app.get('/', (req, res)=>{res.send("Server is running!")})
app.use('/api/user', userRouter)
app.use('/api/owner', ownerRouter)
app.use('/api/booking', bookingRouters)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))