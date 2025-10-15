import express from 'express';
import equipoRoutes from './routes/equipoRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/equipos', equipoRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});