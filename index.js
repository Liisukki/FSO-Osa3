const express = require("express")
const app = express()

app.use(express.json())

let persons = [
  { name: "Arto Hellas", 
    number: "040-123456", 
    id: 1 
},
  { name: "Ada Lovelace", 
    number: "39-44-5323523", 
    id: 2 
},
  { name: "Dan Abramov", 
    number: "12-43-234345", 
    id: 3 
},
  { name: "Mary Poppendieck", 
    number: "39-23-6423122", id: 4 
},
  { name: "Arnold Schwartzenegger", 
    number: "19-223-642121", id: 5 
},
]

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>")
})

// Hae kaikki henkilöt
app.get("/api/persons", (request, response) => {
  response.json(persons)
})

// Hae yksi henkilö ID:n perusteella
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).json({ error: "Person not found" })
  }
})

// Poista henkilö
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)
  response.status(204).end()
})

// Luo uusi ID
const generateId = () => {
  return Math.floor(Math.random() * 100000)
}

// Lisää uusi henkilö
app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number is missing",
    })
  }

  if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "Name must be unique",
    })
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(newPerson)

  response.json(newPerson)
})

// Info-sivu
app.get("/info", (request, response) => {
  const numberOfPersons = persons.length
  const currentDate = new Date()

  const info = `
    <p>Phonebook has info for ${numberOfPersons} people</p>
    <p>${currentDate}</p>
  `
  response.send(info)
})

// Palvelimen käynnistäminen
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
