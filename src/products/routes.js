import ensureAuth from '../middlewares/authenticated'
import { Router } from 'express'
import controller from './controller'
import multer, { memoryStorage } from "multer"

const m = multer({
  storage: memoryStorage()
})

const routes = Router()

routes.get('/products', controller.getList)
routes.post('/products', controller.create)
routes.put('/products/:id', controller.update)
routes.delete('/products/:id', controller.deleteProduct)

export default routes