import express from 'express'
import { InsertUser, InsertPassword } from '../controllers/appUserController.js'

const router = express.Router()

router.post('/insert', (req, res) => {
  InsertUser(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

router.post('/insert-password', (req, res) => {
  InsertPassword(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
