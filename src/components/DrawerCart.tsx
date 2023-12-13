"use client"
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import {
  Drawer,
  Typography,
} from "@material-tailwind/react";
 
export function DrawerCart() {
  const [open, setOpen] = useState(false);
  const cart = useAppSelector(state => state.cartReducer.cart)

  useEffect(()=>{
      setOpen(true);
      setTimeout(() => {
        setOpen(false)
      }, 2500);
  },[cart])


  return (
    <React.Fragment>
      <Drawer open={open} className="p-2 flex flex-col justify-center items-center" placeholder="" >
          <Typography variant="h6" color="blue-gray" placeholder="">
           Shopping Cart
          </Typography>
        <div className="mb-6 flex h-full flex-col items-center gap-6 mt-10">
        {cart?.map(({ title, image, quantity}, index) => (
            <div className="w-24">
                <img src={image} alt="product" />
                <div className="flex w-full justify-between">
                    <Typography variant="small" color="blue-gray" className="font-normal" placeholder="">
                        {title} 
                    </Typography>
                    <Typography variant="small" color="blue-gray" className="font-normal" placeholder="">
                        {`🛒${quantity}`}
                    </Typography>
                </div>
            </div>
        ))
        }
        </div>
      </Drawer>
    </React.Fragment>
  );
}