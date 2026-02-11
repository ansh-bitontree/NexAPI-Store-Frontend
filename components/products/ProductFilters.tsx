"use client";

import "./ProductFilters.css";

interface Props {
  category: string;
  sortBy: string;
  order: string;
  onChange: (data: {
    category: string;
    sortBy: string;
    order: string;
  }) => void;
}

export default function ProductFilters({
  category,
  sortBy,
  order,
  onChange,
}: Props) {
  return (
    <div className="pf-wrap">
      <select
        value={sortBy}
        onChange={(e) =>
          onChange({ category: "", sortBy: e.target.value, order })
        }
        className="pf-select"
      >
        <option value="id">Newest</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>

      <select
        value={order}
        onChange={(e) =>
          onChange({ category: "", sortBy, order: e.target.value })
        }
        className="pf-select"
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
  );
}
