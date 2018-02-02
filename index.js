const express = require('express')
const app = express()

let persons = [
    {
        id: 1,
        name: 'Olli',
        number: '123-4567'
    },
    {
        id: 2,
        name: 'Pekka',
        number: '122-3213'
    },
    {
        id: 3,
        name: 'Matti',
        number: '121-2231'
    },
    {
        id: 4,
        name: 'Teppo',
        number: '120-2123'
    }
]

app.get('/info', (req, res) => {
    res.send(`<p> Puhelinluettelossa ${persons.length} henkilön tiedot</p>
              <p> ${new Date()} </p>`)
})

app.get('/', (req, res) => {
    res.redirect('/persons')
})

app.get('/persons', (req, res) => {
    res.json(persons)
})

app.get('/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
    res.json(person)
    } else {
        res.status(404).end()
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})