import express from 'express'
import { InsertWorker } from '../controllers/workerController.js'

const router = express.Router()

router.post('/insert', (req, res) => {
  InsertWorker(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
