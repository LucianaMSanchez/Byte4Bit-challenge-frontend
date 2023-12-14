'use client'
import { Input, Button } from "@material-tailwind/react";
import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { useGetProductByTitleQuery } from "@/redux/services/productApi";
import { skipToken } from "@reduxjs/toolkit/query";

interface SearchBarProps {
  setSearch: (products: any) => void;
}

export function SearchBar({ setSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState<string>();
  const [error, setError] = useState("");

  const { data: products, isLoading, isFetching, isError } = useGetProductByTitleQuery(searchTerm ?? skipToken);

  useEffect(() => {
    if (isError) {
      setError("No products with that name");
      setSearch([]);
    } else {
      setError("");
      if (!isLoading && !isFetching) {
        setSearch(products);
      }
    }
  }, [isLoading, isFetching, isError, products, setSearch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const title = inputValue.trim();
    setSearchTerm(title)
    setInputValue("")
    if (title === "") {
      setError("Please enter a product");
    } else {
      setError("");
    }
  };

  return (
    <div className="w-72 flex flex-col mx-6">
      <div className="w-72 flex items-center">
        <Input
          color="gray"
          label="Search by product"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={inputValue}
          crossOrigin=""
        />
        <Button
          className="text-center bg-[#281a61] border hover:bg-white hover:text-[#241b58] hover:border-[#35275f] rounded-md hover:shadow-lg"
          onClick={handleSearch}
          placeholder=""
        >
          Search
        </Button>
      </div>
      {error ? <p className="text-sm">{error}</p> : null}
    </div>
  );
}
