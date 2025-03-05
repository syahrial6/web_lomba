"use client";

import NavbarComponent from "./components/Navbar";
import Hero from "./components/Hero";
import { getUser } from "./actions/user";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@heroui/button";
import Link from "next/link";
import Program from "./components/Program";

export default function Home() {
  return (
    <div>
      <div className="container lg:w-[85vw]  m-auto">
        <NavbarComponent />

        <Hero />
      </div>
      <Program />
      <div className="container lg:w-[85vw] grid lg:grid-cols-2 gap-4 mt-36">
        <div className="m-auto">
          <img
            src="./images/pilihan.svg"
            className="lg:w-[400px] w-[200px] bg-cover"
          />
        </div>
        <div className="px-4 font-Poppins">
          <p className="font-bold text-4xl text-blue-500 font-Poppins">
            Bingung Memilih Pelajaran yang Tepat?
          </p>
          <div className="mt-4">
            <p className="text text-justify">
              Banyak siswa merasa kebingungan saat harus menentukan pelajaran
              mana yang sebaiknya mereka fokuskan di sekolah. Apalagi ketika
              mulai memikirkan jurusan kuliah impian, sering muncul pertanyaan
              seperti:
            </p>
            <p className="font-bold mt-4">
              “Kalau aku ingin masuk Teknik Informatika, pelajaran apa yang
              harus aku prioritaskan?”
            </p>
            <p className="font-bold mb-4">
              “Kalau aku suka Biologi, cocoknya ambil jurusan apa, ya?”
            </p>
            <p className="text text-justify">
              Tanpa panduan yang jelas, sering kali siswa mengambil jalan yang
              salah atau merasa kurang percaya diri dengan pilihan mereka.
              Melalui platform ini, kami membantu siswa menemukan
              pelajaran-pelajaran penting yang mendukung jurusan kuliah impian
              mereka.
            </p>
            <Link href={"/login"}>
              <Button className="text-white bg-blue-500 rounded-full px-6 mt-6">
                Ayo Mulai !
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
