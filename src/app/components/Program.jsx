import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
   
    transition: {
      staggerChildren: 1, // Jeda antar anak
      delayChildren: 0.3, // Delay sebelum animasi anak dimulai
    },
  },
};

const item ={
  hidden: { opacity: 0, y: 50 },
  duration: 0.5,
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      mass: 0.5,
    },
  },
}

const Program = () => {
  return (
    <div className="bg-blue-500 mt-52 pb-12">
      <p className="text-center pt-8">
        <span className="inline-block text-xl font-Poppins font-bold bg-white text-blue-500 px-4 py-2 rounded-full">
          Program Unggulan
        </span>
      </p>

      <motion.div
        variants={container}
        viewport={{ once: true, amount: 0.2 }}
        initial="hidden"
          whileInView="visible"
        className="container lg:w-[70%] grid lg:grid-cols-3 gap-4 p-8 w-full m-auto mb-12 font-Poppins text-white"
      >
        <motion.div
        variants={item} className="m-auto border-2 border-blue-700 px-4 py-28 rounded-lg hover:bg-blue-700 transition transform hover:lg:scale-125 hover:scale-105">
          <img src="./images/arabic.png" className="w-12 h-12 m-auto" />
          <p className="text-center text-justify py-4 px-2">
            Program Bahasa Arab dan Bahasa Inggris. Peserta didik mampu untuk
            membaca, mendengar, menulis dan berkomunikasi aktif dengan bahasa
            Arab dan Bahasa Inggris Untuk Kegiatan Sehari-hari.
          </p>
        </motion.div>
        <motion.div variants={item} className="m-auto border-2 border-blue-700 px-4 py-28 rounded-lg  hover:bg-blue-700 transition transform hover:lg:scale-125 hover:scale-105">
          <img src="./images/chemistry.png" className="w-12 h-12 m-auto" />
          <p className="text-center text-justify py-4 px-2">
            Al-Fityan School Kubu Raya merupakan sekolah islam terpadu yang
            menerapkan kurikulum Pendidikan Islam yang integral (menyeluruh) dan
            adaptif terhadap perkembangan sains dan teknologi.
          </p>
        </motion.div>
        <motion.div variants={item} className="m-auto border-2 border-blue-700 px-4 py-28 rounded-lg  hover:bg-blue-700 transition transform hover:lg:scale-125 hover:scale-105">
          <img src="./images/quran.png" className="w-12 h-12 m-auto" />
          <p className="text-center text-justify py-4 px-2">
            Program Unggulan Quran : Tahsin Al-Qur’an : Peserta didik mempu
            membaca Al-Qur’an dengan baik dan benar. Tahfizh Al-Qur’an : Program
            Reguler : Program ini wajib diikuti oleh seluruh siswa dengan target
            3 juz mutqin.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Program;
