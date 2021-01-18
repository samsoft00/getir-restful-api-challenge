import { pick } from 'lodash'
import moment from 'moment'

import MongoDbManager from '../mongodbManager'
const Joi = require('joi').extend(require('@joi/date'))

const dbManager = MongoDbManager.getInstance()

/**
 * Getir controller to handle the following methods
 * 1. Fetch records for database
 */
export default class GetirController {
  static async fetchRecords (req, res, next) {
    const payload = pick(req.body, [
      'startDate',
      'endDate',
      'minCount',
      'maxCount'
    ])

    try {
      // joi validation schema
      const schema = Joi.object({
        startDate: Joi.date()
          .format('YYYY-MM-DD')
          .required()
          .error(
            new Error('Start date is required, must be in YYYY-MM-DD format')
          ),
        endDate: Joi.date()
          .format('YYYY-MM-DD')
          .greater(Joi.ref('startDate'))
          .required()
          .error(
            new Error('End date is required, must be greater than startDate')
          ),
        minCount: Joi.number().strict().required(),
        maxCount: Joi.number()
          .strict()
          .greater(Joi.ref('minCount'))
          .required()
          .error(
            new Error('maxCount is required and must be greater than minCount')
          )
      })

      await schema.validateAsync(payload)

      let { startDate, endDate, minCount, maxCount } = payload

      startDate = moment(startDate, 'YYYY-MM-DD').startOf('day').toDate()
      endDate = moment(endDate, 'YYYY-MM-DD').endOf('day').toDate()

      const findQuery = [
        {
          $match: { createdAt: { $gte: startDate, $lte: endDate } }
        },
        {
          $project: {
            _id: 0,
            key: 1,
            createdAt: 1,
            totalCount: { $sum: '$counts' }
          }
        },
        { $sort: { totalCount: 1 } },
        {
          $match: { totalCount: { $gte: minCount, $lte: maxCount } }
        }
      ]

      const dbClient = dbManager.getDbClient()
      const items = dbClient.collection('records').aggregate(findQuery)

      const r = await items.toArray()

      return res.json({
        code: 0,
        msg: 'Success',
        records: r
      })
    } catch (error) {
      return res.status(400).json({
        code: 1,
        msg: error.message
      })
    }
  }
}
