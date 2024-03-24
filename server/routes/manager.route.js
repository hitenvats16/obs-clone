import {Router} from 'express'

import { createStreamServer } from '../controller/manager.controller.js'

const managerRouter = Router()

managerRouter.post('/create',createStreamServer)

export default managerRouter