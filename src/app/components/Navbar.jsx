"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { motion } from "framer-motion";
import { Avatar, AvatarIcon } from "@heroui/avatar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import Link from "next/link";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <Navbar shouldHideOnScroll maxWidth="full">
        <NavbarBrand>
          <motion.img
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            src="https://alfityankuburaya.sch.id/storage/settings/June2021/BRSlJSDjyL31H6I8Ozzh.png"
            className="w-14 h-12"
          />
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem className="lg:flex">
            <Link
              href="/login"
              className="text-white bg-blue-500 rounded-full px-6 py-2"
            >
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/register"
              className="text-blue-500 bg-white outline outline-1 outline-blue-500 rounded-full px-6 py-2"
            >
              Register
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  }
  return (
    <Navbar shouldHideOnScroll maxWidth="full">
      <NavbarBrand>
        <motion.img
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          src="https://alfityankuburaya.sch.id/storage/settings/June2021/BRSlJSDjyL31H6I8Ozzh.png"
          className="w-14 h-12"
        />
      </NavbarBrand>
      {session && status === "authenticated" ? (
        <NavbarContent justify="end">
          <NavbarItem className="lg:flex">
            <Dropdown>
              <DropdownTrigger>
                <div className="flex items-center rounded-full bg-blue-200 p-1">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt="profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <Avatar
                      classNames={{
                        base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                        icon: "text-black/80",
                      }}
                      className="m-auto w-10 h-10"
                      icon={<AvatarIcon />}
                    />
                  )}
                </div>
              </DropdownTrigger>
              <DropdownMenu>
                {session.user.role === "admin" ? (
                  <DropdownItem onPress={() => router.push(`/dashboard`)}>
                    {" "}
                    Dashboard{" "}
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onPress={() => router.push(`/profile/${session.user.id}`)}
                  >
                    {" "}
                    Profile{" "}
                  </DropdownItem>
                )}

                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onPress={() => signOut({ callbackUrl: "/" })}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="lg:flex">
          <Link
              href="/login"
              className="text-white bg-blue-500 rounded-full px-6 py-2"
            >
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
          <Link
              href="/register"
              className="text-blue-500 bg-white outline outline-1 outline-blue-500 rounded-full px-6 py-2"
            >
              Register
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
}
