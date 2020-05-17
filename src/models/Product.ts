export interface IProduct {
  id: number;
  parentId: number | null;
  loved?: boolean;
  cart?: boolean;
  name: string;
  price: number;
  // imageSrc: string;
  // image: number | null;
  lovedUsers: [];
  createdAt: string;
  updatedAt: string;
}
