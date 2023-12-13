"use client"
import { useRouter } from 'next/navigation';
 import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
 
export default function CancelledComponent(session: any) {

    const router = useRouter()

  return (
    <div className="container flex flex-col mt-20 w-full h-full justify-center items-center">
    <Card className="mt-6 w-[50%]" placeholder="">
    <CardBody placeholder="">
        <Typography className="mb-2" variant="h2" color="blue-gray" placeholder="">
        ☹
        </Typography>
        <Typography variant="h5" placeholder="">
            Your payment couldn't be processed.
            <br />
            Try again later!
            </Typography>
        </CardBody>
        <CardFooter className="pt-0" placeholder="">
            <Button onClick={()=>router.push("/")} placeholder="">Back to Store</Button>
        </CardFooter>
        </Card>
    </div>
  )
}
