import express from 'express';
import cors from 'cors';
import { waitForDb } from './db.js';
import tasksRouter from './routes/tasks.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/tareas', tasksRouter);

async function start() {
  await waitForDb();
  app.listen(PORT, () => {
    console.log(`API escuchando en el puerto ${PORT}`);
  });
}

start();
