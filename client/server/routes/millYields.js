import express from 'express'
import {
  DeleteMillYield,
  GetScaleHistory,
  InsertMillYileds,
  UpdateMillYields,
  checkDuplicate,
  getRekapHistory,
  getRekapHistorySupplier,
  rekapData
} from '../controllers/millYieldsController.js'

const router = express.Router()

router.post('/rekap-data', rekapData)

router.post('/history-rekap', getRekapHistory)
router.post('/history-rekap-supplier', getRekapHistorySupplier)

router.post('/insert', (req, res) => {
  InsertMillYileds(req, (response) => {
    res.status(response.status).json(response)
  })
})

router.post('/scale-in', (req, res) => {
  GetScaleHistory(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

router.post('/update', (req, res) => {
  UpdateMillYields(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

router.post('/delete-mill-yields', (req, res) => {
  DeleteMillYield(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

router.post('/card-check', (req, res) => {
  checkDuplicate(req, (response) => {
    res.status(200).json(response)
  })
})

export default router
