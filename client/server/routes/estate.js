import express from 'express'
import { InsertEstate, InsertEstateLevel } from '../controllers/estateController.js'

const router = express.Router()

router.post('/insert', (req, res) => {
  InsertEstate(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

router.post('/insert-estate-level', (req, res) => {
  InsertEstateLevel(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
