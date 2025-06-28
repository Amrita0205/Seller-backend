import express from 'express';
import { 
  createCategory, 
  getCategories, 
  getCategoryById, 
  updateCategory, 
  deleteCategory 
} from '../controllers/categoryController';
import { authenticateToken, requireRole } from '../middleware/auth';
import { validate, categorySchemas } from '../middleware/validation';

const router = express.Router();

// All category routes require authentication
router.use(authenticateToken);

// Get all categories (public for authenticated users)
router.get('/', getCategories);

// Get category by ID
router.get('/:id', getCategoryById);

// Admin only routes
router.post('/', requireRole(['admin']), validate(categorySchemas.create), createCategory);
router.put('/:id', requireRole(['admin']), validate(categorySchemas.update), updateCategory);
router.delete('/:id', requireRole(['admin']), deleteCategory);

export default router; 