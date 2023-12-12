"use client"
import React, { useEffect, useState } from 'react'
import {useGetProductsQuery} from '@/redux/services/productApi'
import { CardComponent } from './CardComponent'
// import { SearchBar } from './SearchBarComponent'
import { Product } from '@/interfaces/Product'
import { ApiError } from '@/interfaces/ApiError'
import Link from 'next/link'
import { PaginationComponent } from './PaginationComponent'


export default function HomeComponent() {

  const [errors, setErrors] = useState("")
  // const [allProducts, setAllProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)
  
  const {data: products, error, isLoading, isFetching} = useGetProductsQuery(null)

  useEffect(()=>{
    if (error) {
      const apiError = error as ApiError;
      if (apiError.data) {
        setErrors(apiError.data);
      }
    }
  },[error])

  if (isLoading || isFetching) return <p>...Loading</p>

  const indexLast = currentPage * postsPerPage
  const indexFirst = indexLast - postsPerPage
  const currentProducts = products?.slice(indexFirst, indexLast)

  const pageNumbers = []

  if(products){
    for (let i = 1; i <= Math.ceil(products.length / postsPerPage); i++) {
      pageNumbers.push(i)
    }
  }

  return (
    <>
    <div className="container m-auto px-5">
       {/* <SearchBar allProducts={allProducts} setAllProducts={setAllProducts} products={products? products : []}/> */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-10">
          {currentProducts?.map((product: Product) => (
            <article key={product?._id} className="mb-10">
                <Link href={`/${product?._id}`} passHref className="block h-full">
                    <CardComponent product={product} />
                </Link>
            </article>
            ))}
        </section>
      {errors && <span>{errors}</span>}
    </div>
    <PaginationComponent
      pageNumbers = {pageNumbers}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      />
    </>
  )
}
