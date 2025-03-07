import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Typewriter } from 'react-simple-typewriter'

const Hero = () => {
  return (
    <div>
      <div className="container grid lg:grid-cols-2 font-Poppins">
        <div className="px-4 my-auto pt-12">
          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.8,
              delay: 0.2,
              ease: [0, 0.21, 0.2, 1.01],
            }}
            className="text-5xl font-Poppins lg:text-left sm:text-center  leading-tight lg:w-[600px] w-[300px]"
          >
            
            Website{" "}
            <span className="text-[#0099FF] font-bold">
              
               Rekomendasi </span>{" "}
            <span className="text-[#0099FF] font-bold"> Mata Pelajaran Peminatan </span>{" "}
            Siswa
          </motion.p>
          <p className="text-lg mt-12 h-[100px]"
            
          >
            <Typewriter
            words={["Rekomendasi dan saran pemilihan mata pelajaran peminatan kurikulum merdeka berdasarkan nilai rapor dan jurusan perkuliahan pilihan dengan Artificial Inteligence (AI)"]}
           
            cursor
            cursorStyle='_'
            typeSpeed={20}
          
            delaySpeed={1000}
           
          />
          
          </p>
          <div className="pt-16 pb-8">
            <p className="font-bold text-2xl mb-4">
              Al-Fityan School Kubu Raya
            </p>
            <p className=" text-xl">
              Terakreditasi{" "}
              <motion.span
                initial={{ x: "100%" }}
                animate={{ x: "calc(50% - 50%)" }}
                className="font-bold text-4xl bg-orange-300 rounded-full px-3 shadow-2xl"
              >
                A
              </motion.span>
            </p>
          </div>
        </div>
        <div className=" m-auto">
          <motion.img
            src="./images/2.png"
            className="w-96 h-96"
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              delay: 0.2,
              ease: [0, 0.21, 0.2, 1.01],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
