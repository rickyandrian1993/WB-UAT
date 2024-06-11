import express from 'express'
import { getVehicle, InsertVehicle, insertVehicleLocal } from '../controllers/vehicleController.js'

const router = express.Router()

router.post('/', getVehicle)
router.post('/insert-local', insertVehicleLocal)
router.post('/insert', (req, res) => {
  InsertVehicle(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
