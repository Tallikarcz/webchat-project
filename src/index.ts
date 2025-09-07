import express from 'express'
import userRoutes from './routes/userRoutes';
import messageRoutes from './routes/messageRoutes';

const app = express()
const port = 3000

// Middleware para parsear JSON
app.use(express.json());

// Rutas 

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

