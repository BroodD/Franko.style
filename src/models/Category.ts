export interface ICategory {
  id: number;
  image: string;
  name: string;
  parentId: number | null;
  hierarchyLevel: number;
  children: ICategory[];
  createdAt: string;
  updatedAt: string;
}
