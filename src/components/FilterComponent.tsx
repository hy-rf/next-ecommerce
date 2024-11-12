"use client";
import { useState } from "react";

interface FilterComponentProps {
  onFilterChange: (
    minPrice: number,
    maxPrice: number,
    keyword: string,
    category: string
  ) => void;
}

export default function FilterComponent({
  onFilterChange,
}: FilterComponentProps) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const handleFilter = () => {
    onFilterChange(
      Number(minPrice) || 0,
      Number(maxPrice) || Infinity,
      keyword,
      category
    );
  };

  return (
    <div className="mb-4 flex flex-col mr-3 p-4 bg-gray-400 border border-gray-300 rounded gap-2">
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="mr-2 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="mr-2 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Search keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-2 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mr-2 p-2 border rounded"
      />
      <div className="flex justify-end mr-2">
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-5 py-2 rounded"
        >
          Filter
        </button>
      </div>
    </div>
  );
}
