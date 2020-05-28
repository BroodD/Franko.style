import { IProduct } from "./Product";

export interface ICartProduct {
  id: number;
  productId: number;
  userId: number;
  count: number;
  selectedSize: string;
  product: IProduct;
  createdAt: string;
  updatedAt: string;
}
