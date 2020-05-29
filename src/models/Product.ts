export interface IProduct {
  id: number;
  loved: boolean;
  name: string;
  price: number;
  sizes: any;
  images: string[];
  image: string;
  description: string;
  lovedUsers: [];
  createdAt: string;
  updatedAt: string;
}
