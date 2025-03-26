import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swapiRouter from './routes/swapi.routes';
import { connectRedis } from './utils/redis';

dotenv.config();

const app = express();

app.use(cors());
app.use('/api', swapiRouter);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectRedis();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

export { app, startServer };
