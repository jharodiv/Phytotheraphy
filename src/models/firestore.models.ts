import { Timestamp } from "firebase/firestore";

export type UserModel = {
  id: string; // uid
  role: string;
  email: string;
  name: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type PlantModel = {
  id: string;
  scientific_name: string;
  description: string;
  uses: string;
  family: string;
  origin: string;
  preparation_method: string;
  side_effect: string;
};

export type HerbImageModel = {
  id: string;
  herb_id: string;
  image_url: string;
  caption: string;
  created_at: Timestamp;
};

export type CategoryModel = {
  category_id: string;
  name: string;
};

export type HerbCategoryModel = {
  herb_id: string;
  category_id: string;
};

export type FavoriteModel = {
  id: string;
  user_id: string;
  herb_id: string;
  created_at: Timestamp;
};

export type HistoryModel = {
  id: string;
  user_id: string;
  search_term: string;
  searched_at: Timestamp;
};
