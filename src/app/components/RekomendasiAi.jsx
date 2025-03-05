'use client'
import { Chip,Button } from "@heroui/react";
import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "./Loading";

const RekomendasiAi = ({jurusan,nilai}) => {
  console.log(jurusan,nilai)

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);

  const geminiAPI = async () => {
    if (jurusan.length === 0){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Silahkan Tentukan Minat Kuliah Anda Terlebih Dahulu",
      });
    }
    else{
    try {
      setLoading(true);
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBbsl-2GZk_OrIJP0JXhtLwIFsMBWAgoy8",
        {
          contents: [
            {
              parts: [
                {
                  text: `Dengan nilai nilai ini ${JSON.stringify(
                    nilai
                  )} saya ingin kuliah di ${JSON.stringify(
                    jurusan
                  )} maka pelajaran yang harus saya lebih dalami adalah berikan feedback maksimal 5 matapelajaran dengan batasan minimal 50 kata dan maksimal 100 kata`,
                },
              ],
            },
          ],
        }
      );
      setData(response.data);
      console.log(response.data);
      localStorage.setItem(
        "rekomendasi",
        JSON.stringify(response.data?.candidates[0].content.parts[0].text)
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  };
  return (
    <div className="lg:w-[70%] w-full m-auto bg-[url(/images/ellipse_1.png)] bg-cover bg-center bg-no-repeat p-4 rounded-3xl">
    <div className="flex">
      <img src="/images/businessman.png" className="w-24 h-24" />
      <div className="my-auto">
        <Button onClick={()=>geminiAPI()} className="text-white bg-blue-500 rounded-xl font-Poppins">
          Klik Untuk Analisis Dengan AI
        </Button>
       
      </div>
    </div>
    <div className=" rounded-3xl bg-slate-300 w-full lg:h-[300px] h-full font-Poppins mt-4 p-4">
      {loading ? (<Loading/>) : data?.candidates[0].content.parts[0].text}
    </div>
    </div>
  );
};

export default RekomendasiAi;
