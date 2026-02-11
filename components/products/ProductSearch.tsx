"use client";

import "./ProductSearch.css";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <div className="product-search">
      <input
        type="text"
        placeholder="Search products, categories..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="product-search-input"
      />
    </div>
  );
}
