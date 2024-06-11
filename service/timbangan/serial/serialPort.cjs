const express = require('express')
const { GetWeight } = require('./serialPortController.cjs')

const router = express.Router()

router.post('/', (_, res) => {
  GetWeight((response) => {
    res.status(response.status).json(response)
  })
})

module.exports = router
