const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '045-044-041'
  },
  {
    id: 2,
    name: 'Arto Järvinen',
    number: '045-044-042'
  },
  {
    id: 3,
    name: 'Lea Kutvonen',
    number: '045-044-043'
  },
  {
    id: 4,
    name: 'Martti Tienari',
    number: '045-044-044'
  },
  {
    id: 5,
    name: 'Pentti Ahven',
    number: '045-044-045'
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) =>{
  response.send(`Puhelinluettelossa on ${persons.length} henkilön tiedot ${new Date()}`)
})

app.get('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const names = persons.map(person => person.name)
  if (names.includes(body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: getRandomInt(0, 9999)
  }
  persons = persons.concat(person)
  response.json(person)
})

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
