export const calculateBmi = (height: number, weight: number): string => {
  const bmi = Math.round((weight / Math.pow(height, 2)) * 10000);
  if (bmi < 25) {
    return 'Normal (healthy weight)';
  }
  return 'Overweight';
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);
console.log(calculateBmi(height, weight));
