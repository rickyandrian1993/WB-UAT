import express from 'express'

import appUser from './routes/appUser.js'
import commodity from './routes/commodity.js'
import customer from './routes/customer.js'
import dataMapping from './routes/dataMapping.js'
import estate from './routes/estate.js'
import fingerprint from './routes/fingerprint.js'
import login from './routes/login.js'
import mill from './routes/mill.js'
import millYield from './routes/millYields.js'
import report from './routes/report.js'
import serialPort from './routes/serialPort.js'
import sync from './routes/sync.js'
import vendor from './routes/vendor.js'
import vehicle from './routes/vehicle.js'
import worker from './routes/worker.js'
import supplier from './routes/supplier.js'
import ticketNumber from './routes/ticketNumber.js'

const router = express.Router()

router.use('/commodity', commodity)
router.use('/customer', customer)
router.use('/mapping-data', dataMapping)
router.use('/estate', estate)
router.use('/credential', fingerprint)
router.use('/input-data', millYield)
router.use('/login', login)
router.use('/mill', mill)
router.use('/history', millYield)
router.use('/report', report)
router.use('/serial', serialPort)
router.use('/sync', sync)
router.use('/update-data', millYield)
router.use('/user', appUser)
router.use('/vehicle', vehicle)
router.use('/vendor', vendor)
router.use('/worker', worker)
router.use('/supplier', supplier)
router.use('/ticket-number', ticketNumber)

export default router
