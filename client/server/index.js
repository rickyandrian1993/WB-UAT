import cors from 'cors'
import express from 'express'
import cron from 'node-cron'
import { AutoUpload } from './controllers/autoUpload.js'
import router from './routers.js'

// Schedule a task to run at 2:30 PM every day
cron.schedule('00 19 * * *', () => {
  // cron.schedule('*/1 * * * *', () => {
  // In the cron expression '30 14 * * *':

  // 30 in the first position represents "at the 30th minute."
  // 14 in the second position represents "at the 14th hour" (which is 2 PM in 24-hour format).
  // The remaining asterisks (* * * *) represent every day of the month, every month, and every day of the week, respectively.

  // cron.schedule('0 */5 * * *', () => {
  //   // cron.schedule('*/1 * * * *', () => {
  //   // Function to create the logs directory if it doesn't exist
  //   // 0 in the first position represents "at the 0th minute."
  //   // */5 in the second position represents "every 5 hours."
  //   // The remaining asterisks (* * * *) represent every day of the month, every month, and every day of the week, respectively.

  //   // Running upload data to server
  AutoUpload()
})

const app = express()
const port = 3335

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/', router)

app.listen(port, () => console.info(`Server is up and running on port: ${port}`))
