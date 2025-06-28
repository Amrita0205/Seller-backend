import { Schema, model, Document } from 'mongoose';

export interface IOrder extends Document {
  products: { productId: string; quantity: number }[];
  total: number;
  status: string;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Order = model<IOrder>('Order', orderSchema); 