import { Timestamp } from "firebase/firestore";

export type UserModel = {
  id: string; // uid
  role: string;
  email: string;
  userName: string;
  fullName: string;
  photoURL: string;
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

  commonName: string;
  scientificName: string;

  family: string;
  description: string;

  medicinalProperties: string;

  uses: string;
  preparation: string;
  origin: string;

  confidence: number;

  scanned_at: Timestamp;
}
