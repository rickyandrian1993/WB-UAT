import express from 'express'
import {
  GetConnectionOptions,
  UpdateConnectionOptions
} from './../controllers/serialPortController.js'

const router = express.Router()

router.post('/get-connection-options', (_, res) => {
  GetConnectionOptions((response) => {
    res.status(response.status).json(response)
  })
})

router.post('/update-connection-options', (req, res) => {
  UpdateConnectionOptions(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
