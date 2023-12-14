"use client"
import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react'
import { useAddProductMutation } from '@/redux/services/productApi'
import { useRouter } from 'next/navigation';
import useAuthentication from '@/utils/tokenAuthentication';
import useAuthorization from '@/utils/roleAuthorization';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { NewProduct } from '@/interfaces/NewProduct';
import productValidation from '@/utils/productValidations';
 
export default function DashboardComponent() {

  useAuthentication()
  useAuthorization()

  const [newProduct, setNewProduct] = useState<NewProduct>({
    title:"",
    description: "",
    price:"",
    image:""
  })

  const [validationErrors, setValidationErrors] = useState<NewProduct>({
    title: "",
    description: "",
    price: "",
    image:""
  });

  const [addProductMutation, {data: products, error}]= useAddProductMutation()
  const [allFieldsCompleted, setAllFieldsCompleted] = useState(false);
  const [image, setImage] = useState("");
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [event.target.name]: event.target.value,
    }));

    setValidationErrors((prevProduct) => productValidation({
      ...prevProduct,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    setImage(newProduct.image);
  }, [newProduct.image]);

  const areAllFieldsCompleted = () => {
    const fields = Object.values(newProduct);
    return fields.every((field) => field !== "" && field !== null);
  };

  useEffect(() => {
      setAllFieldsCompleted(areAllFieldsCompleted());
  }, [newProduct]);

  const handleSubmit = async () => {
  
      const postProduct = {
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
        image: newProduct.image,
      }
    
    await addProductMutation(postProduct);   
  };

  useEffect(()=>{
    if(products && !error) {
      router.push('/')
    }
  },[products])

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex lg:flex-row flex-col w-full h-full">
      <div className="flex lg:flex-row flex-col w-full h-full justify-center items-center lg:px-36 px-16 sm:px-6 xs:px-2 gap-6">
        <Card color="transparent" shadow={false} placeholder="" className="items-center p-5 py-10 shadow-2xl">
          <Typography variant="h4" color="blue-gray" placeholder="">
            New product
          </Typography>
          <Typography color="gray" className="mt-1 font-normal" placeholder="">
            Add a new product to the Store.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-4">
              <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder="">
                Name
              </Typography>
              <Input
                type="text"
                size="lg"
                placeholder="name of the product"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={newProduct.title}
                name="title"
                crossOrigin=""
                onChange={handleChange}
                onKeyDown={handleKeyPress}
              />
               {validationErrors.title ? <p className='text-xs text-red-900'>{validationErrors.title}</p> : null}
              <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder="">
                Description
              </Typography>
              <Input
                size="lg"
                placeholder="write a description"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={newProduct.description}
                name="description"
                crossOrigin=""
                onChange={handleChange}
                onKeyDown={handleKeyPress}
              />
               {validationErrors.description ? <p className='text-xs text-red-900'>{validationErrors.description}</p> : null}
              <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder="">
                Price
              </Typography>
              <Input
                type="text"
                size="lg"
                placeholder="USD"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={newProduct.price}
                name="price"
                crossOrigin=""
                onChange={handleChange}
                onKeyDown={handleKeyPress}
              />
               {validationErrors.price ? <p className='text-xs text-red-900'>{validationErrors.price}</p> : null}
              <Typography variant="h6" color="blue-gray" className="-mb-3" placeholder="">
                Image
              </Typography>
              <Input
                type="text"
                size="lg"
                placeholder="Paste Url"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={newProduct.image}
                name="image"
                crossOrigin=""
                onChange={handleChange}
                onKeyDown={handleKeyPress}
              />
              </div>
            <Button 
              className="mt-6" 
              fullWidth 
              placeholder=""            
              onClick={handleSubmit}
              disabled={!allFieldsCompleted || Object.values(validationErrors).some(error => error !== "")}> 
              Add product
            </Button>
          </form>
        </Card>
        <div className="flex-1 flex justify-center">
          <div className="w-[50vw] p-10 lg:p-36 place-content-center">
              {image ? (
              <img src={image} alt="Image product" className="shadow-2xl"></img>
              ) : (null)
              }
          </div>
        </div>
      </div>
    </div>
  )
}
