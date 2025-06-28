import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock
} from '../controllers/productController';
import { authenticateToken } from '../middleware/auth';
import { validate, productSchemas } from '../middleware/validation';

const router = express.Router();

// All product routes require authentication
router.use(authenticateToken);

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', validate(productSchemas.create), createProduct);
router.put('/:id', validate(productSchemas.update), updateProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id/stock', updateStock);

export default router;
