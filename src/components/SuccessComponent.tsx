"use client"
import { useRouter } from 'next/navigation';
 import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
 
export default function SuccessComponent({session}: any) {

    const router = useRouter()

  return (
    <div className="container flex flex-col mt-20 w-full h-full justify-center items-center">
        <Card className="mt-6 w-[50%]" placeholder="">
        <CardBody placeholder="">
            <Typography className="mb-2" variant="h2" color="blue-gray" placeholder="">
            ✔
            </Typography>
            <Typography variant="h5" placeholder="">
            Your purchase was succesfully paid!
            <br />
            Your ID Session is:
            <p className="text-xs text-blue-900 flex flex-wrap ">{session}</p>
            <br />
            Thank you!
            </Typography>
        </CardBody>
        <CardFooter className="pt-0" placeholder="">
            <Button onClick={()=>router.push("/")} placeholder="">Back to Store</Button>
        </CardFooter>
        </Card>
    </div>
  )
}
