import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/Product';
import logger from '../utils/logger';

interface AuthRequest extends Request {
  user?: any;
}

export const createProduct = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productData = {
      ...req.body,
      seller: req.user._id // Add seller ID from authenticated user
    };
    
    const product = new Product(productData);
    await product.save();
    
    logger.info(`Product created by seller ${req.user.email}: ${product.name}`);
    res.status(201).json(product);
  } catch (error) {
    logger.error('Create product error:', error);
    next(error);
  }
};

export const getProducts = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      search, 
      active,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    let filter: any = { seller: req.user._id }; // Only show seller's products
    
    if (category) filter.category = category;
    if (active !== undefined) filter.isActive = active === 'true';
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions: any = {};
    sortOptions[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    const skip = (Number(page) - 1) * Number(limit);
    
    const products = await Product.find(filter)
      .populate('category', 'name')
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    });
  } catch (error) {
    logger.error('Get products error:', error);
    next(error);
  }
};

export const getProductById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.user._id // Ensure seller owns the product
    }).populate('category', 'name');

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    logger.error('Get product by ID error:', error);
    next(error);
  }
};

export const updateProduct = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findOneAndUpdate(
      { 
        _id: req.params.id, 
        seller: req.user._id // Ensure seller owns the product
      },
      req.body,
      { new: true, runValidators: true }
    ).populate('category', 'name');

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    logger.info(`Product updated by seller ${req.user.email}: ${product.name}`);
    res.status(200).json(product);
  } catch (error) {
    logger.error('Update product error:', error);
    next(error);
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      seller: req.user._id // Ensure seller owns the product
    });

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    logger.info(`Product deleted by seller ${req.user.email}: ${product.name}`);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    logger.error('Delete product error:', error);
    next(error);
  }
};

export const updateStock = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { stock_quantity } = req.body;
    
    const product = await Product.findOneAndUpdate(
      { 
        _id: req.params.id, 
        seller: req.user._id 
      },
      { stock_quantity },
      { new: true, runValidators: true }
    );

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    logger.info(`Stock updated for product ${product.name} by seller ${req.user.email}`);
    res.status(200).json(product);
  } catch (error) {
    logger.error('Update stock error:', error);
    next(error);
  }
};
