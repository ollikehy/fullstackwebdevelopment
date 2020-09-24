interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    description: string,
    target: number,
    average: number
}

const calculateHours = (hours: number[]) => {
    let sum = 0
    let offDays = 0
    hours.forEach(hour => {
        if (hour > 0) {
            sum += hour
        } else {
            offDays++
        }
    })

    const average = sum / (7 - offDays);
    const results: Result = {
        periodLength: hours.length,
        trainingDays: hours.length - offDays,
        success: average > 4 ? true : false,
        rating: average < 2 ? 1 : average > 4 ? 3 : 2,
        description: average < 2 ? 'Not great' : average > 5 ? 'Good job' : 'Not terrible',
        target: 4,
        average: average
    }
    return results
};

if (process.argv.length > 2) {
    let hours = []
    for (var i = 2; i < process.argv.length; i++) {
        hours.push(parseInt(process.argv[i]))
    }
    console.log(calculateHours(hours))
} else {
    console.log(calculateHours([3, 0, 2, 4.5, 0, 3, 1]))
}