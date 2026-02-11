"use client";

import "./Pagination.css";

interface Props {
  page: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
}

export default function Pagination({ page, onPageChange, hasNext }: Props) {
  return (
    <div className="pg-wrap">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="pg-btn"
      >
        Prev
      </button>

      <span className="pg-info">Page {page}</span>

      <button
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        className="pg-btn"
      >
        Next
      </button>
    </div>
  );
}
