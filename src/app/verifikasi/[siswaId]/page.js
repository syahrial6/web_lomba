"use client";
import React, { use, useEffect, useState } from "react";
import { InputOtp } from "@heroui/input-otp";
import { sendEmail, verfiedEmail } from "../../actions/user";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Verifikasi = ({ params }) => {
  const unwrap = use(params);
  const [value, setValue] = useState("");
  const router = useRouter();

  const verifikasiEmail = async () => {
    try {
      if (value.length == 4) {
        const res = await verfiedEmail({ id: unwrap.siswaId, otp: value });
        if (res.message){
          Swal.fire({ icon: "success", title: "Berhasil", text: res.message });
          router.push("/login");
        }
        if (res.error){
          Swal.fire({ icon: "error", title: "Gagal", text: res.error });
        }
      } 
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    verifikasiEmail();
  }, [value]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container w-[30%] h-[200px] m-auto shadow-lg">
        <button onClick={() => sendEmail(unwrap.siswaId)}>Kirim</button>
        <p className="text-2xl text-center text-blue-500 font-bold font-Poppins mb-4">
          Verifikasi
        </p>
        <p className="text-xl text-center font-Poppins">Masukkan Kode OTP</p>
        <InputOtp
          className="m-auto"
          length={4}
          value={value}
          onValueChange={setValue}
        />
        <div className="text-small text-default-500">
          OTP value: <span className="text-md font-medium">{value}</span>
        </div>
      </div>
    </div>
  );
};

export default Verifikasi;
