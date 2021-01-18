import { Router } from 'express'

import GetirRoute from './getit.routes'

const routes = Router()

routes.use('/v1/', GetirRoute)

export default routes
