import React from 'react'
import { CoursePart } from './App'

interface PartProps {
  coursePart: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

const renderSwitch = (coursePart: CoursePart) => {
  switch (coursePart.name) {
    case 'Fundamentals':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount}
        </p>
      )
    case 'Using props to pass data':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} {coursePart.groupProjectCount}
        </p>
      )
    case 'Deeper type usage':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} {coursePart.exerciseSubmissionLink}
        </p>
      )
    case 'Deeper deeper type usage':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} {coursePart.yoloLink}
        </p>
      )
    default:
      return assertNever(coursePart)
  }
}

const Part: React.FC<PartProps> = (props) => {
  return renderSwitch(props.coursePart)
}

export default Part
