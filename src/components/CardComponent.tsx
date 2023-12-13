"use client"
import { Product } from "@/interfaces/Product";
import { addProductToCart, removeProductFromCart } from "@/redux/features/cartSlice";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
   
  interface CardComponentProps {
    product: Product;
  }
  
  export const CardComponent: React.FC<CardComponentProps> = ({ product }) => {
    const {data} = useSession()
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(0)
    const router = useRouter()
    const cart = useAppSelector(state => state.cartReducer.cart)

    const handleAddToCart = () => {
        dispatch(addProductToCart(product));
    };

    const handleRemoveFromCart = () => {
      if(product._id){
        dispatch(removeProductFromCart(product._id));
      }
    };

    const cartUpdate = () => {
      const foundItem = cart.find((item) => item._id === product._id);
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
      <Card className="w-full h-full" placeholder="">
        <Link href={`/${product?._id}`} passHref className="block h-full">
        <CardHeader shadow={false} floated={false} className="h-96" placeholder="">
          <img
            src={product.image}
            alt="card-image"
            className="h-full object-cover items-center justify-center m-auto"
          />
        </CardHeader>
        <CardBody placeholder="">
          <div className="mb-2 flex items-center justify-between">
            <Typography variant="h2" color="blue-gray" className="font-medium" placeholder="">
              {product.title}
            </Typography>
            <Typography variant="h5" color="blue-gray" className="font-medium" placeholder="">
              {`${product.price} USD`}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
            placeholder=""
          >
            {product.description}
          </Typography>
          <Typography
            variant="h6"
            color="gray"
            className="font-normal opacity-75"
            placeholder=""
          >
            {`🛒 ${quantity}`}
          </Typography>
        </CardBody>
        </Link>
        <CardFooter className="pt-0" placeholder="">
          {data ? (
          <div>
          <Button
            onClick={handleAddToCart}
            ripple={false}
            fullWidth={true}
            placeholder=""
            disabled={!data}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Add to Cart
          </Button>
          <Button
            onClick={handleRemoveFromCart}
            ripple={false}
            fullWidth={true}
            placeholder=""
            disabled={!data}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 mt-6"
          >
            Remove from Cart
          </Button>
          </div>
    ) : (
      <div>
         <Button
            onClick={()=>router.push("/login")}
            ripple={false}
            fullWidth={true}
            placeholder=""
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 mt-6"
          >
            Sign in to shop
          </Button>
      </div>
    )
        }
        </CardFooter>
      </Card>
    );
  }