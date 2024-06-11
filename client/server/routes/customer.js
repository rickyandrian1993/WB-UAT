import express from 'express'
import { InsertCustomer } from '../controllers/customerController.js'

const router = express.Router()

router.post('/insert', (req, res) => {
  InsertCustomer(req, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
