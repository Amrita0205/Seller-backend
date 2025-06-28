import { Request, Response, NextFunction } from 'express';
import { Category } from '../models/Category';
import logger from '../utils/logger';

export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = new Category(req.body);
    await category.save();
    
    logger.info(`Category created: ${category.name}`);
    
    res.status(201).json(category);
  } catch (error) {
    logger.error('Create category error:', error);
    next(error);
  }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { active } = req.query;
    let filter: any = {};
    
    if (active !== undefined) {
      filter.isActive = active === 'true';
    }
    
    const categories = await Category.find(filter).populate('parentCategory', 'name');
    res.status(200).json(categories);
  } catch (error) {
    logger.error('Get categories error:', error);
    next(error);
  }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id).populate('parentCategory', 'name');
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    logger.error('Get category by ID error:', error);
    next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    
    logger.info(`Category updated: ${category.name}`);
    res.status(200).json(category);
  } catch (error) {
    logger.error('Update category error:', error);
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    
    logger.info(`Category deleted: ${category.name}`);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    logger.error('Delete category error:', error);
    next(error);
  }
}; 