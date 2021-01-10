import React from 'react'
import { CoursePart } from './Content'

interface TotalProps {
  courseParts: CoursePart[]
}

const Total: React.FC<TotalProps> = (props) => {
  return (
    <p>
      Number of exercises {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}{' '}
    </p>
  )
}

export default Total
