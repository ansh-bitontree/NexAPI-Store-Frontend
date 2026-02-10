"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./ProductDetail.css";
import { Product } from "../../../../types/product";
import { getProductById } from "../../../../lib/productApi";

export default function ProductDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || isNaN(id) || id <= 0) return;
    
    getProductById(id)
      .then(setProduct)
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError(err.message || "Failed to load product");
      });
  }, [id]);

  if (error) return <p className="pd-loading" style={{color: "red"}}>Error: {error}</p>;
  if (!product) return <p className="pd-loading">Loading...</p>;

  return (
    <div className="pd-wrap">
      <h1 className="pd-name">{product.name}</h1>
      <p className="pd-cat">{product.category}</p>
      <p className="pd-desc">{product.description}</p>
      <p className="pd-price">₹{product.price}</p>
      {product.rating && <p className="pd-rating">⭐ {product.rating}</p>}
    </div>
  );
}
