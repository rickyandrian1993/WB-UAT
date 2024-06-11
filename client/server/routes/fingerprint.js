import express from 'express'
import {
  CredentialList,
  InsertBiometric,
  RemoveBiometric
} from '../controllers/fingerPrintController.js'

const router = express.Router()

router.post('/insert', (req, res) => {
  InsertBiometric(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

router.post('/list', (_, res) => {
  CredentialList((response) => {
    res.status(response.status).json(response)
  })
})

router.post('/delete', RemoveBiometric)

export default router
