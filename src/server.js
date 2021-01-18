import Getir from './app'
import log from 'fancy-log'
import MongoDbManager from './utils/mongodbManager'
require('dotenv').config()

const dbManager = MongoDbManager.getInstance()

const port =
  parseInt(process.env.NODE_ENV === 'test' ? 8378 : process.env.PORT, 10) ||
  8000

Getir.listen(port, async () => {
  await dbManager.connectDb()

  log(`Server is running on http://localhost:${port} `)
})
