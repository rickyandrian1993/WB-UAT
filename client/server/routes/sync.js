import express from 'express'
import { GetUploadData, SyncData } from '../controllers/syncController.js'

const router = express.Router()

router.post('/', (req, res) => {
  GetUploadData(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

router.post('/upload', (req, res) => {
  SyncData(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
