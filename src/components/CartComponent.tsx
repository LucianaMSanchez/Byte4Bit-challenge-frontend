"use client"
import React, { useEffect, useState } from 'react'
import { useAppSelector} from '@/redux/hooks'  
import { useDispatch } from "react-redux";
import useAuthentication from '@/utils/tokenAuthentication'
import Link from 'next/link'
import { Button, Card, Typography } from '@material-tailwind/react'
import { removeProductFromCart } from "@/redux/features/cartSlice";
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function CartComponent() {
    useAuthentication()
    const [total, SetTotal] = useState<number>()
    const cart = useAppSelector(state => state.cartReducer.cart)
    const dispatch = useDispatch();
    const router = useRouter()
    const tableHead = ['Product', 'Image', 'Unit Price', 'Quantity', '']

    const handleRemoveFromCart = (id : any) => {
      dispatch(removeProductFromCart(id));
    };

    const calculateTotalPurchase = () => {
      const totalAmount = cart.reduce((acc, product) => {
        const productPrice = parseFloat(product.price || '0');
        const productQuantity = product.quantity || 0;
        const productTotal = productPrice * productQuantity;
        return acc + productTotal;
      }, 0);
    
      SetTotal(parseFloat(totalAmount.toFixed(2))); 
    };

    useEffect(()=>{
      calculateTotalPurchase()
    },[cart])

    const handleCheckout = async () => {
      const checkoutArray = cart.map((product) => ({
        price_data: {
          product_data: {
            name: product.title,
            description: product.description,
          },
        currency: "usd",
        unit_amount: Math.round(parseFloat(product.price) * 100)
        },
        quantity: product.quantity
      }));
      const {data} = await axios.post("http://localhost:3001/api/payments/create-checkout-session", checkoutArray)
      router.push(data.url)
    }

    return (
    <div className="container m-auto items-center flex flex-col h-full">
    <Card className="h-full w-[80%] mt-32 " placeholder="">
      <table className="w-full  table-auto text-left">
        <thead>
          <tr>
            {tableHead.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder=""
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {cart?.map(({ title, image, price, _id, quantity }, index) => (
            <tr key={_id} className="even:bg-blue-gray-50/50">
              <td className="p-4 w-[40%]">
              <Link href={`/${_id}`} passHref className="block">
                <Typography variant="small" color="blue-gray" className="font-normal" placeholder="">
                  {title}
                </Typography>
              </Link>
              </td>
              <td className="p-4 w-[30%]">
              <Link href={`/${_id}`} passHref className="block">
                <Typography variant="small" color="blue-gray" className="font-normal" placeholder="">
                  <img src={image} alt="product" className="block w-10"/>
                </Typography>
              </Link>
              </td>
              <td className="p-4 w-[20%]">
                <Typography variant="small" color="blue-gray" className="font-normal" placeholder="">
                 {`${price} USD`}
                </Typography>
              </td>
              <td className="p-4 w-[20%]">
                <Typography variant="small" color="blue-gray" className="font-normal" placeholder="">
                  {quantity}
                </Typography>
              </td>
              <td className="p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium"
                placeholder=""
                >
                   <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="delete-svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className='hover:cursor-pointer float-right mr-3'
                  onClick={()=>handleRemoveFromCart(_id)}
                  >
                    <path
                    d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"
                    fill='#df0000'
                    />
                    <path
                    d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"
                    fill='#df0000'
                    />
                    <path
                    d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"
                    fill='#df0000'
                    />
                  </svg>
    
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
    <div>
    <Typography variant="h4" color="blue-gray" className="font-normal mt-20 text-end" placeholder="">
        {`Total: ${total} USD`}
    </Typography>
    <Button
          onClick={handleCheckout}
          ripple={false}
          fullWidth={true}
          placeholder=""
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 mt-6"
        >
          Checkout
    </Button>
    </div>
    </div>
  )
}
