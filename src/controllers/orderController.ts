import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/Order';

export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await Order.find().populate('products.productId');
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    next(error);
  }
}; 