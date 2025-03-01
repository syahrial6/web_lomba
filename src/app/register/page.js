"use client";
import React, { useState } from "react";
import { Input } from "@heroui/input";
import Link from "next/link";
import { Button,Alert } from "@heroui/react";
import { MoveLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { createUser } from "../actions/user";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";



const Register = () => {
  const router = useRouter();
  const [visible,setVisible] = useState(false)

    const {register,handleSubmit,reset,formState:{errors}} = useForm()



    const FormSubmit = async(data)=>{
        const {error,message,user} = await createUser(data);
        console.log(error,message,user);
        if(error){
            alert(error);
        }
        if(message){
          Swal.fire({
            title: 'Success',
            text: message,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
           
            reset();
            router.push(`/verifikasi/${user.id}`);
        }

    }
  return (
    <div className="container grid lg:grid-cols-2 font-Poppins h-screen">
      <div className=" items-center bg-[#CBEAFF] lg:w-full lg:h-full justify-center ">
        <div className="flex justify-start p-8">
          <Link href={"/"}>
            <MoveLeft size={30} />
          </Link>
        </div>
        <div className="lg:px-48 px-16 py-20">
          <div className="shadow-lg p-8 bg-white rounded-lg">
            <form onSubmit={handleSubmit(FormSubmit)}>
              <p className="text-2xl font-bold text-center mb-8 text-[#123FC6]">
                Register
              </p>
              <Input label="Name" type="text" className="mb-4" {...register("name")} />
              <Input label="Email" type="email" className="mb-4" {...register("email")}  />
              <Input label="Password" type="password" className="mb-4" {...register("password")}  />
              <Input label="Confirm Password" type="password" className="mb-4" {...register("confPassword")}  />
              <Button type="submit" className="w-full bg-[#123FC6] text-white">Register</Button>
            </form>
            <div className="flex flex-col gap-4">
    
    </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <img src="./images/ellipse2.png" className="w-96 h-72 lg:absolute lg:bottom-0 lg:right-0" />
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

export default Register;
