import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      const errorMessage = error.details.map((detail: any) => detail.message).join(', ');
      res.status(400).json({ error: errorMessage });
      return;
    }
    
    next();
  };
};

// Validation schemas
export const userSchemas = {
  register: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('seller', 'admin').default('seller')
  }),
  
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  
  update: Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email()
  })
};

export const productSchemas = {
  create: Joi.object({
    sku: Joi.string().required(),
    name: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500),
    single_price: Joi.number().min(0).required(),
    set_prices: Joi.array().items(
      Joi.object({
        size: Joi.string().required(),
        price: Joi.number().min(0).required()
      })
    ),
    stock_quantity: Joi.number().min(0).required(),
    category: Joi.string().required(),
    images: Joi.array().items(Joi.string().uri()),
    tags: Joi.array().items(Joi.string()),
    weight: Joi.number().min(0),
    dimensions: Joi.object({
      length: Joi.number().min(0),
      width: Joi.number().min(0),
      height: Joi.number().min(0)
    })
  }),
  
  update: Joi.object({
    name: Joi.string().min(1).max(100),
    description: Joi.string().max(500),
    single_price: Joi.number().min(0),
    set_prices: Joi.array().items(
      Joi.object({
        size: Joi.string().required(),
        price: Joi.number().min(0).required()
      })
    ),
    stock_quantity: Joi.number().min(0),
    category: Joi.string(),
    isActive: Joi.boolean(),
    images: Joi.array().items(Joi.string().uri()),
    tags: Joi.array().items(Joi.string()),
    weight: Joi.number().min(0),
    dimensions: Joi.object({
      length: Joi.number().min(0),
      width: Joi.number().min(0),
      height: Joi.number().min(0)
    })
  })
};

export const categorySchemas = {
  create: Joi.object({
    name: Joi.string().min(1).max(50).required(),
    description: Joi.string().max(200),
    parentCategory: Joi.string()
  }),
  
  update: Joi.object({
    name: Joi.string().min(1).max(50),
    description: Joi.string().max(200),
    isActive: Joi.boolean(),
    parentCategory: Joi.string()
  })
}; 