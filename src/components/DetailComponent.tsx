"use client"
import useAuthentication from '@/utils/tokenAuthentication'
import React, { useEffect, useState } from 'react'
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import { useGetProductByIdQuery } from '@/redux/services/productApi'
import { addProductToCart, removeProductFromCart } from '@/redux/features/cartSlice'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { AlertCustomAnimation } from './Alert'
import {
  Card,
  Button,
  Typography
} from "@material-tailwind/react";
 

export default function DetailComponent({productId}: any) {

  useAuthentication()
  const dispatch = useAppDispatch()
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(0)
  const [alert, setAlert] = useState<boolean>(false)
  const [randomViewersCount, setRandomViewersCount] = useState<number>(randomViewers());
  const {data}= useSession()
  const { data: product, error: getProductError, isLoading, isFetching } = useGetProductByIdQuery(productId);
  const cart = useAppSelector(state => state.cartReducer.cart)

  function randomViewers() {
    const randomNumber = Math.random();
    const viewers = Math.floor(randomNumber * 10) + 1;
    return viewers;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomViewersCount(randomViewers());
    }, 90000);

    return () => clearInterval(intervalId);
  }, []);

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
    router.push(`dashboard/${product?._id}`)
  };

  const handleDeleteProduct = () => {
    setAlert(true)
  };

  const cartUpdate = () => {
    const foundItem = cart?.find((item) => item._id === product?._id);
    if (foundItem) {
      setQuantity(foundItem.quantity || 0);
    } else {
      setQuantity(0)
    }
  };

  useEffect(()=>{
    cartUpdate()
  },[cart])

  return (
    <div>
       <Link
        href={'/'}
        className="fixed top-20 left-10 bg-[#150a5c] px-[1.5rem] py-2 rounded-full text-white z-40 text-xl"
      >
        ⬅
      </Link>
      {alert && <AlertCustomAnimation setAlert={setAlert} productId={product?._id}/>}
      <div className="flex lg:flex-row flex-col w-full h-full">
        <div className="flex flex-col gap-6 justify-center items-center">
          <div className="lg:w-[50vw] w-[70vw] lg:p-20 p-6 place-content-center">
            <img src={product?.image} alt="Image product" className="shadow-2xl"></img>
          </div>
            { (data?.user?.role === "admin") ? (
          <div className="mt-10 mb-6">
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
        <div className="flex-1 flex justify-center items-center px-20">
          <Card color="transparent" shadow={false} placeholder="" className="items-center p-5 py-10 shadow-2xl">
            <Typography variant="h2" color="blue-gray" placeholder="">
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
                <Typography
                  variant="h6"
                  color="gray"
                  className="font-normal opacity-75"
                  placeholder=""
                >
                  {`🛒 ${quantity}`}
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
               {`Other ${randomViewersCount} shoppers are viewing this product right now, Hurry up!`}
            </Typography>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
