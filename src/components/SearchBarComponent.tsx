'use client'

import { Input, Button } from "@material-tailwind/react";
import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { Product } from "@/interfaces/Product";
 
interface SearchBarProps {
    allProducts: Product[];
    setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    products: Product[];
  }

export function SearchBar({ allProducts, setAllProducts, products }: SearchBarProps) {

    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    }
  
    const handleSearch = () => {
        setAllProducts(products)
        const searchTerm = inputValue.trim().toUpperCase()
    
        if (searchTerm === "") {
            setError("Please enter a product")
            return;
        }
    
        const productByName = allProducts.filter((product) => {
            const productTitle = product.title.toUpperCase()
    
            return productTitle.includes(searchTerm)
        });
    
        if (productByName.length === 0) {
            setError("No products with that name")
            setInputValue("");       
        } else {
            setAllProducts(productByName);
            setInputValue("");
            setError("");
        }
    };

        useEffect(() => {
            setTimeout(() => {
                setError("");
            }, 2000);
            }, [error]);

    return (
        <div className="w-72 flex flex-col mx-6">
            <div className="w-72 flex items-center">
                <Input 
                    color="gray"
                    label="Author" 
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    value={inputValue}
                    crossOrigin=""
                    />
                <Button 
                className="text-center bg-[#571B58] border hover:bg-white hover:text-[#571B58] hover:border-[#571B58] rounded-md hover:shadow-lg" 
                onClick={handleSearch}
                placeholder=""
                >
                    Search
                </Button>
            </div>
                    {error ? (
                        <p className='text-sm'>{error}</p>
                    ) : ( null)}
        </div>
    )
}