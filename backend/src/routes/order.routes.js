import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/order.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(authenticate, createOrder);

router.route('/myorders')
  .get(authenticate, getMyOrders);

router.route('/:id')
  .get(authenticate, getOrderById);

router.route('/:id/status')
  .put(authenticate, authorize('admin'), updateOrderStatus);

export default router;
