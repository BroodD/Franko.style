import { Location } from "../../models/Location";
import { Speaker } from "../../models/Speaker";
import { Schedule, Session } from "../../models/Schedule";
import { ICategory } from "../../models/Category";
export interface ConfState {
  loved: any[];
  cart: any[];
  products: any[];
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
