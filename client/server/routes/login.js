import express from 'express'
import { CheckSuperAdmin, Login } from '../controllers/loginController.js'

const router = express.Router()

router.post('/', (req, res) => {
  Login(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

router.post('/check-password', (req, res) => {
  CheckSuperAdmin(req.body, (response) => {
    res.status(response.status).json(response)
  })
})

export default router
