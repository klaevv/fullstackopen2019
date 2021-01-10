import React from 'react'
import Part from './Part'
import { CoursePart } from './App'

interface ContentProps {
  courseParts: CoursePart[]
}

const Content: React.FC<ContentProps> = (props) => {
  return (
    <div>
      <Part coursePart={props.courseParts[0]} />
      <Part coursePart={props.courseParts[1]} />
      <Part coursePart={props.courseParts[2]} />
      <Part coursePart={props.courseParts[3]} />
    </div>
  )
}

export default Content
