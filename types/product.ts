export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  image_url?: string;
  rating?: number;
  is_active: boolean;
}

export type SortBy = "id" | "name" | "price" | "rating";

