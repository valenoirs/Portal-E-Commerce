import { Router } from 'express'
import * as order from '../controllers/order'

export const router = Router()

router.post('/', order.createOrder)

router.get('/', order.userGetAllOrder)

router.put('/', order.updateOrderStatus)

router.patch('/', order.ratingOrder)
