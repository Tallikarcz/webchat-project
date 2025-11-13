import express from 'express';
import userRoutes from './routes/userRoutes';
import messageRoutes from './routes/messageRoutes';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import cors from 'cors'

// Allow the frontend dev server (http://localhost:5174) plus existing origins
const allowedOrigins = ['http://localhost:3000','http://localhost:3001','http://localhost:5174'];

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);
app.use('/auth', authRoutes);


export default app;
