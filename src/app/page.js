'use client'


import NavbarComponent from "./components/Navbar";
import Hero from "./components/Hero";
import { getUser } from "./actions/user";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";



export default function Home() {


  
  // const fetchData = async()=>{
  //   try {
  //     const {user} = await getUser();
  //     return user;
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // }
  // const {data} = useQuery({ queryKey: ['user'], queryFn: fetchData })
  // console.log(data);



  return (
    <div className="container w-[85vw]  m-auto">
    <NavbarComponent/>
   
    <Hero/>
   </div>
  );
}
