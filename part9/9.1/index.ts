import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateHours from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (req.query.height && req.query.weight) {
        const height: number = +req.query.height;
        const weight: number = +req.query.weight;
        res.send({ height: height, weight: weight, bmi: calculateBmi(height, weight) });
    } else {
        res.send({ error: 'Given parameters were not suitable for BMI calculation' });
    }
});

app.post('/exercises', (req, res) => {
    let malformedExercises = false;
    // eslint-disable-next-line
    const exercises = req.body.daily_exercises.map((ex: number) => {
        if (ex > -1) {
            return ex;
        } else {
            malformedExercises = true;
            return ex;
        }
    });
    //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = parseFloat(req.body.target);
    if (isNaN(target) || malformedExercises) {
        res.send({ error: 'Malformatted parameters' });
    } else if (exercises && target) {
        res.send(calculateHours(target, exercises));
    } else {
        res.send({ error: "Parameters missing" });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});