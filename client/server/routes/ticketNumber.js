import express from 'express'
import { syncTicketNumber } from '../controllers/ticketNumbers.js'

const router = express.Router()

router.post('/', (req, res) => {
  syncTicketNumber(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
