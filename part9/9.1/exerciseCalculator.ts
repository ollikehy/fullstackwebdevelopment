interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    description: string,
    target: number,
    average: number
}

const calculateHours = (targetValue: number, hours: number[]): Result => {
    let sum = 0;
    let offDays = 0;
    hours.forEach(hour => {
        if (hour > 0) {
            sum += hour;
        } else {
            offDays++;
        }
    });

    const average = sum / (hours.length - offDays);
    const results: Result = {
        periodLength: hours.length,
        trainingDays: hours.length - offDays,
        success: average >= targetValue ? true : false,
        rating: average < targetValue ? 1 : average > (targetValue + 1) ? 3 : 2,
        description: average < targetValue ? 'Not great' : average > (targetValue + 1) ? 'Good job' : 'Not terrible',
        target: targetValue,
        average: average
    };
    return results;
};

/*if (process.argv.length > 3) {
    const hours = [];
    for (let i = 3; i < process.argv.length; i++) {
        hours.push(parseInt(process.argv[i]));
    }
    console.log(calculateHours(parseInt(process.argv[2]), hours));
} else {
    console.log(calculateHours(2, [3, 0, 2, 4.5, 0, 3, 1]));
}*/

export default calculateHours;