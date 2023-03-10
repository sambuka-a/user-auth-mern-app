const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')
const port = process.env.PORT || 5000

const app = express()
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Serve frontend

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => res.send('Please set to prod'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`server run on port ${port}`))