import React from 'react'

const Courses = ({courses}) => {
  return (
    <div>
      <Header name="Opetusohjelma" />
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = props =>
  <h1>{props.name}</h1>

const Total = props => {
  const values = props.parts.map(part => part.exercises)
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  return <p>yhteensä {values.reduce(reducer)} tehtävää :)</p>
}


const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({parts}) => {
  return (
    parts.map(part => <Part key={part.id} part={part} />)
  )
}

export default Courses
