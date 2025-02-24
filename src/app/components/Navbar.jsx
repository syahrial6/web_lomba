
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
  } from "@heroui/react";
  import Link from "next/link";

  
  export const AcmeLogo = () => {
    return (
      <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
        <path
          clipRule="evenodd"
          d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    );
  };
  
  export default function NavbarComponent() {
    return (
      <Navbar shouldHideOnScroll maxWidth="full">
        <NavbarBrand>
          <img
            src="https://alfityankuburaya.sch.id/storage/settings/June2021/BRSlJSDjyL31H6I8Ozzh.png"
            className="w-14 h-12"
          />
        </NavbarBrand>
  
        <NavbarContent justify="end">
          <NavbarItem className="lg:flex">
          <Link href={"/login"}>
            <Button className="text-white bg-blue-500 rounded-full px-6">
            
              Login
           
            </Button>
            </Link>
          </NavbarItem>
          <NavbarItem>
          <Link href={"/register"}>
            <Button className="text-blue-500 bg-white outline-blue-500 rounded-full px-6">
             
              Register
             
            </Button>
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  }
  