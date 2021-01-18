/* eslint-env jest */
import request from 'supertest'
import app from '../src/app'

import MongoDbManager from '../src/utils/mongodbManager'

/**
 * Unit and/or Integration Tests using jest
 */

describe('Getir Reports', () => {
  const dbManger = MongoDbManager.getInstance()

  afterAll(async (done) => {
    await dbManger.close()
    done()
  })

  beforeAll(async (done) => {
    await dbManger.connectDb()
    done()
  })

  describe('POST /v1/getir-records', () => {
    it('should return 404 for wrong route', async () => {
      const response = await request(app)
        .post('/getir-records')
        .set('Content-Type', 'application/json')
        .send({
          ...global.testRequest,
          startDate: '01-26-2016',
          endDate: '02-02-2018'
        })

      expect(response.body.msg).toEqual('Resource does not exist')
      expect(response.status).toBe(404)
    })

    it('should return status code 400 if start and end date format is wrong', async () => {
      const response = await request(app)
        .post('/v1/getir-records')
        .set('Content-Type', 'application/json')
        .send({
          ...global.testRequest,
          startDate: '01-26-2016',
          endDate: '02-02-2018'
        })

      expect(response.body.code).toBe(1)
      expect(response.status).toBe(400)
    })

    it('should throw error if startdate is greater than enddate', async () => {
      const response = await request(app)
        .post('/v1/getir-records')
        .set('Content-Type', 'application/json')
        .send({
          ...global.testRequest,
          startDate: '01-26-2021',
          endDate: '02-02-2018'
        })

      expect(response.body.code).toBe(1)
      expect(response.body.msg).toEqual(
        'Start date is required, must be in YYYY-MM-DD format'
      )
    })

    it('should throw error if minCount is greater than maxCount', async () => {
      const response = await request(app)
        .post('/v1/getir-records')
        .set('Content-Type', 'application/json')
        .send({
          ...global.testRequest,
          maxCount: 3000,
          minCount: 42700
        })

      expect(response.body.code).toBe(1)
      expect(response.body.msg).toEqual(
        'maxCount is required and must be greater than minCount'
      )
    })

    it('should return array of records', async () => {
      const response = await request(app)
        .post('/v1/getir-records')
        .set('Content-Type', 'application/json')
        .send({ ...global.testRequest })

      expect(response.body.code).toBe(0)
      expect(response.body.msg).toEqual('Success')
      expect(response.body).toHaveProperty('records')
    })
  })
})
