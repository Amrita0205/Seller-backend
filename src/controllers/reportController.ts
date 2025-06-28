import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/Order';

export const getSalesReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const report = await Order.aggregate([
      { $group: { _id: null, totalSales: { $sum: '$total' }, orderCount: { $sum: 1 } } }
    ]);
    res.status(200).json(report[0] || { totalSales: 0, orderCount: 0 });
  } catch (error) {
    next(error);
  }
}; 