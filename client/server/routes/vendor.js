import express from 'express'
import { GetVendor, InsertVendor } from '../controllers/vendorController.js'

const router = express.Router()

router.post('/', (req, res) => {
  GetVendor(req, (response) => {
    res.status(response.status).json(response)
  })
})

router.post('/insert', (req, res) => {
  InsertVendor(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
