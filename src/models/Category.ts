export interface ICategory {
  id: number;
  imageSrc: string;
  name: string;
  image: number | null;
  parentId: number | null;
  hierarchyLevel: number;
  children: ICategory[];
  createdAt: string;
  updatedAt: string;
}
