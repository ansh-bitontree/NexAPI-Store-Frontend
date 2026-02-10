"use client";

import { useEffect, useState } from "react";
import "./ProductPage.css";
import { Product } from "../../../types/product";
import { getProducts } from "../../../lib/productApi";
import ProductFilters from "../../../components/products/ProductFilters";
import Pagination from "../../../components/products/Pagination";
import ProductCard from "../../../components/products/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"id" | "price" | "name">("id");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);

  const limit = 6;

  useEffect(() => {
    getProducts({ page, limit, sort_by: sortBy, order })
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [page, sortBy, order]);

  return (
    <div className="pg">
      <h1 className="pg-title">Products</h1>

      <ProductFilters
        category=""
        sortBy={sortBy}
        order={order}
        onChange={({ sortBy, order }) => {
          setSortBy(sortBy as "id" | "price" | "name");
          setOrder(order as "asc" | "desc");
          setPage(1);
        }}
      />

      {loading ? (
        <p className="pg-loading">Loading...</p>
      ) : (
        <div className="pg-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        onPageChange={setPage}
        hasNext={products.length === limit}
      />
    </div>
  );
}
