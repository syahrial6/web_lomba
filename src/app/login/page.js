"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@heroui/input";
import Link from "next/link";
import { Button } from "@heroui/react";
import { MoveLeft } from "lucide-react";
import { signIn, useSession, getSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import Loading from "../components/Loading";

const Login = () => {
  const { data: session, status } = useSession();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (loginData) => {
    
    setLoading(true);
    try {
      const signInResult = await signIn("credentials", {
        email: loginData.email,
        password: loginData.password,
        redirect: false,
      });

      if (signInResult.ok) {
        const session = await getSession();
        if (session.user.role === "user") {
          router.push(`/profile/${session?.user?.id}`);
        }
        else{
          router.push(`/dashboard`);
        }
        
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: signInResult.error,
          confirmButtonColor: "#3085d6",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signIn("google", { redirect: true ,callbackUrl: "/profile"});
      console.log(signIn);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  if (status === "loading") {
    return(<div className="m-auto flex justify-center items-center"> <Loading /></div>);
  }

  return (
    <div className="container grid lg:grid-cols-2 font-Poppins h-screen">
      <div className=" items-center bg-[#CBEAFF] lg:w-full lg:h-full justify-center ">
        <div className="flex justify-start p-8">
          <Link href={"/"}>
            <MoveLeft size={30} />
          </Link>
        </div>
        <div className="lg:px-48 px-16 py-32">
          <div className="shadow-lg p-8 bg-white rounded-lg">
            <form onSubmit={handleSubmit(handleLogin)}>
              <p className="text-2xl font-bold text-center mb-8 text-[#123FC6]">
                Login to Your Account
              </p>
              {/* <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-fade-in`}
      >
        <span className="text-xl">{icon}</span>
        <span>{message}</span>
      </div>
    </div> */}
              <Input
                {...register("email")}
                label="Email"
                type="email"
                className="mb-4"
              />
              <Input
                {...register("password")}
                label="Password"
                type="password"
                className="mb-4"
              />
              <Button
                isLoading={loading}
                type="submit"
                className="w-full bg-[#123FC6] text-white"
              >
                {loading ? "Loading..." : "Login"}
              </Button>
            </form>

            <div className="flex w-fit mt-4 m-auto gap-3">
              <Button
                onPress={() => handleSignInWithGoogle()}
                type="submit"
                className="w-full bg-white text-[#123FC6]"
              >
                <FaGoogle /> Sign In With Google
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <img
          src="./images/ellipse2.png"
          className="w-96 h-72 lg:absolute lg:bottom-0 lg:right-0"
        />
        <p className="font-bold text-6xl font-Poppins mt-28 ml-20 w-48 leading-relaxed">
          <span className="text-[#123FC6]">Welcome </span> Back !
        </p>
        <div className="mt-4 ml-20 flex">
          <img src="./images/folder.png" className="w-32 h-32" />
          <img src="./images/key.png" className="w-32 h-32" />
        </div>
      </div>
    </div>
  );
};

export default Login;
