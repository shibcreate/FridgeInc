const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
    app.use(express.json())
const posts = [
    {
        username: 'Sarah',
        title: 'Post 1'
    },
    {
        username: 'Rits',
        title: 'Post 2'
    }
]

app.get('/posts', (req, res) => {
    res.json(posts)
})

app.get('/login', (req, res) => {
    //authenticating user is handled by phuong i think


    const username = req.body.username
})

app.listen(3000)