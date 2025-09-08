import express from 'express';
import userRoutes from './routes/userRoutes';
import messageRoutes from './routes/messageRoutes';

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

export default app;
