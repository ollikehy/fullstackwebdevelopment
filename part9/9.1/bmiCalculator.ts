const calculateBmi = (height: number, mass: number): string => {
    const bmi = mass / ((height / 100) ** 2);

    if (bmi <= 15) {
        return 'Very severely underweight';
    } else if (bmi > 15 && bmi <= 16) {
        return 'Severely underweight';
    } else if (bmi > 16 && bmi <= 18.5) {
        return 'Underweight';
    } else if (bmi > 18.5 && bmi <= 25) {
        return 'Normal weight';
    } else if (bmi > 25 && bmi <= 30) {
        return 'Overweight';
    } else if (bmi > 30 && bmi <= 35) {
        return 'Obese Class I (Moderately obese)';
    } else if (bmi > 35 && bmi <= 40) {
        return 'Obese Class II (Severely obese)';
    } else if (bmi > 40) {
        return 'Obese Class III (Very severely obese)';
    } else {
        return 'An error happened';
    }
};


/*if (process.argv.length > 3) {
    console.log(calculateBmi(parseInt(process.argv[2]), parseInt(process.argv[3])));
}*/

export default calculateBmi;