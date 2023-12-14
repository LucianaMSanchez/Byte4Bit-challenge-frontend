"use client"
import React, { useEffect } from "react";
import { Alert, Button } from "@material-tailwind/react";
import { useDeleteProductMutation } from "@/redux/services/productApi";
import { useRouter } from "next/navigation";

export function AlertCustomAnimation({ setAlert, productId }: any) {
  const [open, setOpen] = React.useState(true);
  const [deleteProductMutation, { data: deleted, error: deleteProductError }] = useDeleteProductMutation(productId);
  const router = useRouter();

  useEffect(()=>{
    if(!open){
        setAlert(false);  
    }
  },[open])

  const handleDeleteProduct = () => {
        deleteProductMutation(productId);
  };

  useEffect(() => {
        if (deleted) {
        router.push("/");
        }
  }, [deleted]);

  return (

        <div className="w-[50%] absolute mt-80 place-content-center mx-12">
          <Alert
            open={open}
            onClose={()=> setOpen(false)}
            color="deep-purple"
            animate={{
              mount: { y: 0 },
              unmount: { y: 100 },
            }}
          >
            Sure you want to delete permanently this product from Store??
          </Alert>
          <Button
            color="deep-orange"
            className="absolute mt-4 lg:mx-96 md:mx-72 mx-50"
            onClick={handleDeleteProduct}
            placeholder=""
          >
            CONFIRM
          </Button>
        </div>
  
  );
}
