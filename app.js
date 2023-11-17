const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

const postRoute = require('./routes/post.route.js')
const userRoute = require('./routes/user.route.js')

const corsOptions = {
  origin: true,
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api', userRoute)

app.use('/api', postRoute)

module.exports = app

// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => console.log('Listing to port ' + PORT))
