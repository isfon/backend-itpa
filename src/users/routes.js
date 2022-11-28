import ensureAuth from '../middlewares/authenticated'
import { Router } from 'express'
import controller from './controller'
import multer, { memoryStorage } from "multer"

const m = multer({
  storage: memoryStorage()
})

const routes = Router()

routes.post('/user/login', controller.login)

export default routes