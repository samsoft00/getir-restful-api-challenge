import { Router } from 'express'
import GetirController from '../controller/getir.controller'

const routes = Router()

routes.post('/getir-records', GetirController.fetchRecords)

export default routes
