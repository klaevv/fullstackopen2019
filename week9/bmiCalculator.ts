const calculateBmi = (height: number, weight: number): string => {
  const bmi = Math.round((weight / Math.pow(height, 2)) * 10000)
  if (bmi < 25) {
    return 'Normal (healthy weight)'
  }
  return 'Overweight'
}

console.log(calculateBmi(180, 74))
