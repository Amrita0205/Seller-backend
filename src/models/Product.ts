import { Schema, model, Document, Types } from 'mongoose';

interface ISetPrice {
  size: string;
  price: number;
}

export interface IProduct extends Document {
  sku: string;
  name: string;
  description?: string;
  single_price: number;
  set_prices: ISetPrice[];
  stock_quantity: number;
  category: Types.ObjectId;
  seller: Types.ObjectId;
  isActive: boolean;
  images?: string[];
  tags?: string[];
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}

const productSchema = new Schema<IProduct>({
  sku: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String,
    trim: true
  },
  single_price: { 
    type: Number, 
    required: true,
    min: 0
  },
  set_prices: [{ 
    size: { type: String, required: true }, 
    price: { type: Number, required: true, min: 0 } 
  }],
  stock_quantity: { 
    type: Number, 
    required: true,
    min: 0
  },
  category: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  seller: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  images: [{ 
    type: String 
  }],
  tags: [{ 
    type: String,
    trim: true
  }],
  weight: { 
    type: Number,
    min: 0
  },
  dimensions: {
    length: { type: Number, min: 0 },
    width: { type: Number, min: 0 },
    height: { type: Number, min: 0 }
  }
}, {
  timestamps: true
});

// Index for better query performance
productSchema.index({ seller: 1, category: 1 });
productSchema.index({ sku: 1 });
productSchema.index({ isActive: 1 });

export const Product = model<IProduct>('Product', productSchema);
