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

app.get('/', (req, res) => {
    res.redirect('/persons')
})

app.get('/persons', (req, res) => {
    res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})