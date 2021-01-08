interface ExerciseFeedback {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface Arguments {
  data: number[]
  target: number
}

const exerciseCalculator = (data: Array<number>, target: number): ExerciseFeedback => {
  const avg = data.reduce((a, b) => a + b, 0) / data.length;
  const rating = avg > target ? 3 : avg === target ? 2 : 1;
  const ratingDescription =
    rating === 3 ? 'Good job!' : rating === 2 ? 'Average job.' : 'Bad job...';
  return {
    periodLength: data.length,
    trainingDays: data.filter((d) => d > 0).length,
    success: avg >= target,
    rating,
    ratingDescription,
    target,
    average: avg,
  };
};

const parseArguments = (args: Array<string>): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const converted = args.map((val) => parseFloat(val));
  const data = converted.filter((val) => !isNaN(val));
  data.pop();
  return {
    data,
    target: converted[converted.length - 1],
  };
};

const { data, target } = parseArguments(process.argv);

console.log(data, target);

console.log(exerciseCalculator(data, target));
