const express = require('express')
const cors = require('cors')
const serial = require('./serial/serialPort.cjs')

const corsOptions = {
  origin: true,
  credentials: true
}

const app = express()
const port = 3336

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors(corsOptions))
app.use('/get-weigh', serial)

app.listen(port, () => console.log(`Server is up and running on port: ${port}`))
