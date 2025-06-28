import express from 'express';
import { getSalesReport } from '../controllers/reportController';

const router = express.Router();
router.get('/sales', getSalesReport);

export default router; 