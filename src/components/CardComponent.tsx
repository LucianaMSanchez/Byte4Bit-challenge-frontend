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
   
  interface CardComponentProps {
    product: Product;
  }
  
  export const CardComponent: React.FC<CardComponentProps> = ({ product }) => {
    const {data} = useSession()
    const dispatch = useDispatch();
    const router = useRouter()

    const handleAddToCart = () => {
        dispatch(addProductToCart(product));
    };

    const handleRemoveFromCart = () => {
      if(product._id){
        dispatch(removeProductFromCart(product._id));
      }
    };

    return (
      <Card className="w-full overflow-hidden h-full" placeholder="">
        <CardHeader shadow={false} floated={false} className="h-96" placeholder="">
          <img
            src={product.image}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody placeholder="">
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium" placeholder="">
              {product.title}
            </Typography>
            <Typography color="blue-gray" className="font-medium" placeholder="">
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
        </CardBody>
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
            onClick={()=>router.push("/")}
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