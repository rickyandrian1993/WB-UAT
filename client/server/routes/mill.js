import express from 'express'
import { GetMill, InsertMill, UpdateMill } from '../controllers/millController.js'

const router = express.Router()

router.post('/', (_, res) => {
  GetMill((response) => {
    res.status(response.status).json(response)
  })
})

router.post('/insert', (req, res) => {
  InsertMill(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

router.post('/update', (req, res) => {
  UpdateMill(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
