"use client";

import Link from "next/link";
import Image from "next/image";
import "./ProductCard.css";
import { Product } from "../../types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/dashboard/products/${product.id}`} className="pcard">
      {product.image_url && (
        <div className="pcard-image-wrapper">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="pcard-image"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <h3 className="pcard-name">{product.name}</h3>
      <p className="pcard-cat">{product.category}</p>
      <p className="pcard-price">₹{product.price}</p>
      {product.rating && <p className="pcard-rating">⭐ {product.rating}</p>}
    </Link>
  );
}
