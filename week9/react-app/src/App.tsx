import React from 'react'
import './App.css'
import Header from './Header'
import Content from './Content'
import Total from './Total'

interface CoursePartBase {
  name: string
  exerciseCount: number
}

interface CoursePartExtendedBase extends CoursePartBase {
  description: string
}

interface CoursePartOne extends CoursePartExtendedBase {
  name: 'Fundamentals'
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data'
  groupProjectCount: number
}

interface CoursePartThree extends CoursePartExtendedBase {
  name: 'Deeper type usage'
  exerciseSubmissionLink: string
}

interface CoursePartFour extends CoursePartExtendedBase {
  name: 'Deeper deeper type usage'
  yoloLink: string
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour

const App: React.FC = () => {
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    },
    {
      name: 'Deeper deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      yoloLink: 'https://fake-exercise-submit.made-up-url.dev',
    },
  ]

  return (
    <div>
      <Header courseName="Half Stack application development" />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
}

export default App
