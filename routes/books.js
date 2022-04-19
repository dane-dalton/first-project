const express = require('express')
const Author = require('../models/author')
const Book = require('../models/book')
const router = express.Router()

// All books route
router.get('/', async (req,res) => {
    res.send('All Books')
})

//New book route
router.get('/new', async (req, res) => {
    try {
        const authors = await author.find({})
        const book = new Book()
        res.render('books/new', {
            authors: authors,
            book: book
        }) 
    } catch {
        res.redirect('/books')
    }
})

//Create Book Route
router.post('/', async (req, res) => {
    res.send('Create Book')
})

module.exports = router