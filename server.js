if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser : true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set ('layout', 'layouts/layout') //used to avoid html duplication
app.use(expressLayouts)
app.use(methodOverride('_method')) // for put and delete
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))


app.use(express.json())

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3000, () => console.log('Server has started'))