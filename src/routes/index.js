import { Router } from 'express'

import GetirRoute from './getit.routes'

const routes = Router()

routes.get('/', (req, res) => {
  return res.status(200).json({
    code: 0,
    msg: 'Getir v1.0 RESTful api challenge, go to /v1/getir-records to get started.'
  })
})

routes.use('/v1/', GetirRoute)

export default routes
