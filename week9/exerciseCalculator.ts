interface ExerciseFeedback {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const exerciseCalculator = (data: Array<number>, target: number): ExerciseFeedback => {
  const avg = data.reduce((a, b) => a + b, 0) / data.length
  const rating = avg > target ? 3 : avg === target ? 2 : 1
  const ratingDescription =
    rating === 3 ? 'Good job!' : rating === 2 ? 'Average job.' : 'Bad job...'
  return {
    periodLength: data.length,
    trainingDays: data.filter((d) => d > 0).length,
    success: avg >= target,
    rating,
    ratingDescription,
    target,
    average: avg,
  }
}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))
