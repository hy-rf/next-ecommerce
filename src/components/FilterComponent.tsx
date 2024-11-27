"use client";
import { TextField } from "@mui/material";
import { useState } from "react";

interface FilterComponentProps {
  minPrice: number;
  maxPrice: number;
  keyword: string;
  category: string;
}

export default function FilterComponent({
  filterProps,
  show,
}: {
  filterProps: FilterComponentProps;
  show: boolean;
}) {
  const [showFilter, setShowFilter] = useState(show);
  const [minPrice, setMinPrice] = useState(filterProps.minPrice.toString());
  const [maxPrice, setMaxPrice] = useState(filterProps.maxPrice.toString());
  const [keyword, setKeyword] = useState(filterProps.keyword);
  const [category, setCategory] = useState(filterProps.category);

  const handleFilter = () => {
    const searchParams: { [key: string]: string } = {};

    if (keyword) searchParams.keyword = keyword;
    if (category) searchParams.category = category;
    if (minPrice && minPrice !== "0" && minPrice != "")
      searchParams.minPrice = minPrice;
    if (maxPrice != Infinity.toString() && maxPrice != "")
      searchParams.maxPrice = maxPrice;

    const query = new URLSearchParams(searchParams).toString();
    window.location.href = `/product?${query}`;
  };

  return (
    <>
      <button onClick={() => setShowFilter(!showFilter)}>Show filter</button>
      {showFilter && (
        <div className="mb-4 flex flex-row mr-3 p-4 bg-gray-400 border border-gray-300 rounded gap-2">
          <TextField
            id="standard-number"
            label="Min Price"
            type="number"
            variant="standard"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            value={minPrice.toString() == "0" ? "" : minPrice.toString()}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <TextField
            id="standard-number"
            label="Max Price"
            type="number"
            variant="standard"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Search keyword"
            variant="standard"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Category"
            variant="standard"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
      )}
    </>
  );
}
