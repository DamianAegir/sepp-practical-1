import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getBrands
} from '../controllers/product.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Categories and brands routes (must come before /:id route)
router.get('/categories', getCategories);
router.get('/brands', getBrands);

router.route('/')
  .get(getProducts)
  .post(authenticate, authorize('admin'), createProduct);

router.route('/:id')
  .get(getProduct)
  .put(authenticate, authorize('admin'), updateProduct)
  .delete(authenticate, authorize('admin'), deleteProduct);

export default router;
