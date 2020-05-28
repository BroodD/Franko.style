import { ICategory } from "../../models/Category";
import { IProduct } from "../../models/Product";
import { ICartProduct } from "../../models/CartProduct";
export interface ConfState {
  loved: IProduct[];
  cart: ICartProduct[];
  products: IProduct[];
  productsPage: number;
  loading?: boolean;
  error: string;
  categories: ICategory[];
}
