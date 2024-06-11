import express from 'express'
import { getSupplier, addSupplier } from '../controllers/supplierController.js'

const router = express.Router()

router.post('/', getSupplier)
router.post('/insert', addSupplier)

export default router
