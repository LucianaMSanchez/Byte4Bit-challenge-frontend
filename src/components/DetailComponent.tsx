"use client"
import useAuthentication from '@/utils/tokenAuthentication'
import React, { useEffect, useState } from 'react'
import {useAppDispatch} from '@/redux/hooks'
import { useDeleteProductMutation, useGetProductByIdQuery } from '@/redux/services/productApi'
import { Product } from '@/interfaces/Product'
import { addProductToCart, removeProductFromCart } from '@/redux/features/cartSlice'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  Card,
  Button,
  Typography,
} from "@material-tailwind/react";
 

export default function DetailComponent({productId}: any) {

  useAuthentication()
  const dispatch = useAppDispatch()
  const router = useRouter();
  const [newProduct, SetNewProduct] = useState<Product>({
    title: "",
    description:"",
    price:"",
    image:"",
    _id:""
  })
  const {data}= useSession()
  const { data: product, error: getProductError, isLoading, isFetching } = useGetProductByIdQuery(productId);
  const [deleteProductMutation, { data: deleted, error: deleteProductError }] = useDeleteProductMutation(productId);
  
  function randomViewers() {
    const randomNumber = Math.random();
    const viewers = Math.floor(randomNumber * 10) + 1;
    return viewers;
  }

  const handleAddToCart = () => {
    if(product) {
      dispatch(addProductToCart(product));
    }
  };

  const handleRemoveFromCart = () => {
    if(product?._id){
      dispatch(removeProductFromCart(product._id));
    }
  };

  const handleUpdateProduct = () => {
    router.push("/dashboard")
  };

  const handleDeleteProduct = () => {
    if(product?._id){
      deleteProductMutation(product._id);
    }
  };

  useEffect(()=>{
    if(deleted){
      router.push("/")
    }
  },[deleted])

  return (
    <div>
       <Link
        href={'/'}
        className="fixed top-20 left-10 bg-[#150a5c] px-[1.5rem] py-2 rounded-full text-white z-40 text-xl"
      >
        ⬅
      </Link>
      <div className="flex w-full">
        <div className="flex-1 flex justify-center">
          <div className="w-[50vw] p-36 place-content-center">
            <img src={product?.image} alt="Image product" className="shadow-2xl"></img>
            { (data?.user?.role === "admin") ? (
          <div className="mt-16">
              <Button
                onClick={handleUpdateProduct}
                ripple={false}
                fullWidth={true}
                placeholder=""
                className="bg-blue-gray-900 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                Update Product
              </Button>
              <Button
                onClick={handleDeleteProduct}
                ripple={false}
                fullWidth={true}
                placeholder=""
                className="bg-blue-gray-900 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 mt-6"
              >
                Delete Product from Store
              </Button>
              </div>
            ) : (null)
            }
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center px-20">
          <Card color="transparent" shadow={false} placeholder="" className="items-center p-5 py-10 shadow-2xl">
            <Typography variant="h4" color="blue-gray" placeholder="">
            {product?.title}
            </Typography>
            <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-4">
                <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder="">
                  Description
                </Typography>
                <Typography color="gray" className="mt-1 font-normal" placeholder="">
                  {product?.description}
                </Typography>
                <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder="">
                  Unit Price
                </Typography>
                <Typography color="gray" className="mt-1 font-normal" placeholder="">
                  {`${product?.price} USD`}
                </Typography>
              </div>
              <div>
              <Button
                onClick={handleAddToCart}
                ripple={false}
                fullWidth={true}
                placeholder=""
                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                Add to Cart
              </Button>
              <Button
                onClick={handleRemoveFromCart}
                ripple={false}
                fullWidth={true}
                placeholder=""
                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 mt-6"
              >
                Remove from Cart
              </Button>
              </div>
            </div>
            <div className="mt-20">
            <Typography variant="h5" color="blue-gray" placeholder="">
               {`Other ${randomViewers()} shoppers are viewing this product right now, Hurry up!`}
            </Typography>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
