const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Salasana puuttuu')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://klaevv:${password}@cluster0-mipjv.mongodb.net/puhelinluettelo?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})

if (process.argv.length === 3) {
  console.log('Puhelinluettelo:')
  Person
    .find({name: 'people'})
    .then(persons => {
      console.log('persons: ', persons)
      persons.forEach(person => {
        console.log('Entry: ', person)
      })
      mongoose.connection.close()
    })
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

person.save().then(response => {
  console.log(`lisätään ${process.argv[3]} numero ${process.argv[4]} luetteloon`)
  mongoose.connection.close()
  process.exit(1)
})
