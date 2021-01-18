import { MongoClient } from 'mongodb'
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_NAME = process.env.MONGODB_NAME

/**
 * Mongodb Client Manager
 */
export default class MongodbManager {
  static getInstance () {
    if (!MongodbManager.instance) {
      MongodbManager.instance = new MongodbManager()
    }

    return MongodbManager.instance
  }

  async connectDb () {
    this._client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true })
    await this._client.connect()
  }

  getDbClient () {
    if (!this._client) throw new Error('Mongodb client connection issue')
    return this._client.db(MONGODB_NAME)
  }

  async close () {
    if (this._client) {
      await this._client.close()
    }
  }

  async dropDatabase () {
    if (this._client) {
      await this._client.db(MONGODB_NAME).dropDatabase()
    }
  }
}
