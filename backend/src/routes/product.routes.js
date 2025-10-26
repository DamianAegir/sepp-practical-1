import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(authenticate, authorize('admin'), createProduct);

router.route('/:id')
  .get(getProduct)
  .put(authenticate, authorize('admin'), updateProduct)
  .delete(authenticate, authorize('admin'), deleteProduct);

export default router;
