import { Location } from "../../models/Location";
import { Speaker } from "../../models/Speaker";
import { Schedule, Session } from "../../models/Schedule";
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

  schedule: Schedule;
  sessions: Session[];
  speakers: Speaker[];
  favorites: number[];
  locations: Location[];
  filteredTracks: string[];
  searchText?: string;
  mapCenterId?: number;
  allTracks: string[];
}
