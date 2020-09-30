import express from 'express';
import cors from 'cors';
import diagnoseRouter from './src/routers/diagnoseRouter';
import patientRouter from './src/routers/patientRouter';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('Someone pinged');
    res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
