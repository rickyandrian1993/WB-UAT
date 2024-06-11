import express from 'express'
import { MappingData } from '../controllers/dataMappingController.js'

const router = express.Router()

router.post('/', (req, res) => {
  MappingData(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
