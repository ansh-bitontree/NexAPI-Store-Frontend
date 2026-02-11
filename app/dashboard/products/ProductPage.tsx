"use client";

import { useEffect, useState } from "react";
import "./ProductPage.css";
import { Product, SortBy } from "../../../types/product";
import { getProducts } from "../../../lib/productApi";
import ProductFilters from "../../../components/products/ProductFilters";
import Pagination from "../../../components/products/Pagination";
import ProductCard from "../../../components/products/ProductCard";
import ProductSearch from "../../../components/products/ProductSearch";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("id");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  const limit = 6;

useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts({ page, limit, sort_by: sortBy, order });
      setProducts(data);
    } 
    catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } 
    finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [page, sortBy, order]);


  const filteredProducts = products.filter((p) =>
    [p.name, p.category]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="pg">
      <h1 className="pg-title">Products</h1>

      <div className="pg-toolbar">
        <ProductSearch value={search} onChange={setSearch} />

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
      </div>

      {loading ? (
        <p className="pg-loading">Loading...</p>
      ) : error ? (
        <p className="pg-error">{error}</p>
      ) : (
        <div className="pg-grid">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        onPageChange={setPage}
        hasNext={filteredProducts.length === limit}
      />
    </div>
  );
}
