'use client'
import React from "react";
import Link from "next/link";
import { signOut } from 'next-auth/react'
import {useRouter} from 'next/navigation'
import { useSession } from "next-auth/react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
 
export default function NavbarComponent() {
  const [openNav, setOpenNav] = React.useState(false);
  const router = useRouter()
  const {data}= useSession()

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleSignOut = async() => {
    const res = await signOut({redirect: false})
    router.push("/login")
  }

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      { (data?.user?.role === "admin") ?
      (<Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-[#93e6ff]"
        placeholder=""
      >
        <Link href="/dashboard" className="flex items-center">
          Add a new product
        </Link>
      </Typography>) : null}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-[#93e6ff]"
        placeholder=""
      >
        <Link href="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-[#93e6ff]"
        placeholder=""
      >
        <Link href="/cart" className="flex items-center">
          Shopping Cart
        </Link>
      </Typography>
    </ul>
  );
 
  return (
    <Navbar className="m-auto w-full py-2 px-4 lg:px-8 lg:py-4 lg:-mb-6 shadow bg-gradient-to-r from-[#274b8d] to-[#1e0046] z-30" placeholder="">
    <div className="container mx-auto flex items-center justify-between text-blue-gray-200">
          <Link href="/">
                 <h1 className="mr-4 text-[#93e6ff] cursor-pointer py-1.5 text-xl weight-bold">Byte4Bit Store</h1>
          </Link>
            <div className="mr-4 hidden lg:block">{navList}</div>
            <Button
              onClick={handleSignOut}
              size="md"
              className="bg-[#020435] text-[#cdfdff] hidden lg:inline-block"
              placeholder=""
            >
              <>Sign Out</>
            </Button>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
              placeholder=""
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        <Collapse open={openNav} >
        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2" color='teal' onClick={handleSignOut} placeholder="">
            <>Sign Out</>
          </Button>
          </div>
        </Collapse>
      </Navbar>
  );
}