"use client";


import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"



const links = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Add Destination", href: "/add-destination" },
];

const Navbar = () => {


const handeleSignOut = () => {

authClient.signOut();

}




   const { 
        data: session, 
       
    } = authClient.useSession() 

const user = session?.user


  return (
    <header className="absolute inset-x-0 top-0 z-20 bg-white shadow-sm">
      <div className="relative mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 lg:px-16">
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                i === 0
                  ? "font-medium text-[#1d9fc2]"
                  : "text-zinc-800 transition-colors hover:text-[#1d9fc2]"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="md:absolute md:left-1/2 md:-translate-x-1/2"
          aria-label="Wanderlast home"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            className="h-5 w-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-5 text-sm text-zinc-800">
          {/* <Link
            href="/profile"
            className="hidden items-center gap-1.5 hover:text-[#1d9fc2] sm:flex"
          >
            <User className="size-4" />
            Profile
          </Link> */}




{
  user?<Popover>
        <PopoverTrigger render={<Avatar>
  <AvatarImage src={user?.image as string}   referrerPolicy="no-referrer" />
  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
</Avatar>} />
        <PopoverContent align="start">
          <PopoverHeader>
            <PopoverTitle>{user?.name}</PopoverTitle>
            <PopoverDescription>
             {user?.email}<br/>
             <Button variant={'destructive'} onClick={handeleSignOut }>Sign Out</Button>
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>:<>
       <Link href="/signin" className="hover:text-[#1d9fc2]">
            Login
          </Link>
          <Link href="/signup" className="font-medium hover:text-[#1d9fc2]">
            Sign Up
          </Link>
      
      
      </>



}


         
        </div>
      </div>
    </header>
  );
}

export default Navbar ;