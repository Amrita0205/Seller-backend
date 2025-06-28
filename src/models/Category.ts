import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description?: string;
  isActive: boolean;
  parentCategory?: string;
}

const categorySchema = new Schema<ICategory>({
  name: { 
    type: String, 
    required: true,
    trim: true,
    unique: true
  },
  description: { 
    type: String,
    trim: true
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  parentCategory: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category' 
  }
}, {
  timestamps: true
});

export const Category = model<ICategory>('Category', categorySchema); 