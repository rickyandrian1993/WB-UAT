import express from 'express'
import { GetReport, GetReportList } from '../controllers/reportController.js'

const router = express.Router()

router.post('/', (req, res) => {
  GetReport(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

router.post('/list', GetReportList)

export default router
