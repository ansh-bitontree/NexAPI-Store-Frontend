import { apiFetch } from "./api";
import { Product } from "@/types/product";

export interface ProductListParams {
  page?: number;
  limit?: number;
  category?: string;
  sort_by?: "id" | "price" | "name" | "rating";
  order?: "asc" | "desc";
}


export function getProducts(params: ProductListParams) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== "") as [string, string][]
  ).toString();

  return apiFetch<Product[]>(`/products?${query}`);
}

export function getProductById(id: number) {
  if (!id || isNaN(id) || id <= 0) throw new Error("Invalid product ID");
  return apiFetch<Product>(`/products/${id}`);
}
