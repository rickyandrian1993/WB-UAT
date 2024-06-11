import express from 'express'
import { InsertCommodity } from '../controllers/commodityController.js'

const router = express.Router()

router.post('/insert', (req, res) => {
  InsertCommodity(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
