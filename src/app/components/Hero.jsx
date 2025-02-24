import React from "react";

const Hero = () => {
  return (
    <div>
    <div className="container grid lg:grid-cols-2 font-Poppins">
      <div className="px-4 my-auto pt-12">
        <p className="text-5xl font-Poppins  leading-tight lg:w-[600px] w-[300px]">
          Website <span className="text-[#0099FF] font-bold"> Rekomendasi </span>{" "}
          <span className="text-[#0099FF] font-bold"> Minat Bakat </span> Siswa
        </p>
        <p className="text-lg mt-12">
          Rekomendasi dan saran pemilihan jurusan berdasarkan nilai dan jurusan
          pilihan dengan Artificial Inteligence (AI)
        </p>
        <div className="pt-16 pb-8">
          <p className="font-bold text-2xl mb-4">Al-Fityan School Kubu Raya</p>
          <p className=" text-xl">Terakreditasi <span className="font-bold text-4xl bg-orange-300 rounded-full px-3 shadow-2xl">A</span> </p>
        </div>
      </div>

      <div className=" m-auto">
        <img src="./images/2.png" className="w-96 h-96" />
      </div>
    </div>
    <p className="m-auto rounded-full px-2 text-center font-Poppins font-bold text-2xl bg-blue-500 text-white py-2 my-24 w-fit">Program Unggulan</p>
    <div className="container grid lg:grid-cols-3 gap-4 w-[50%] m-auto mb-12 font-Poppins">
      <div className="flex m-auto">
        <img src="./images/arabic.png" className="w-12 h-12" />
        <p className="text-center font-bold text-xl py-4 px-2">Arabic</p>
      </div>
      <div className="flex m-auto">
        <img src="./images/chemistry.png" className="w-12 h-12" />
        <p className="text-center font-bold text-xl py-4 px-2">Robotik</p>
      </div>
      <div className="flex m-auto">
        <img src="./images/quran.png" className="w-12 h-12" />
        <p className="text-center font-bold text-xl py-4 px-2">Al-Qur'an</p>
      </div>

    </div>
    </div>
  );
};

export default Hero;
