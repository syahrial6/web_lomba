import React from "react";
import { Avatar, AvatarIcon, Button, Chip } from "@heroui/react";
import { Pencil, Trash } from "lucide-react";
import ModalTambahMinat from "./ModalTambahMinat";
import ModalTambahNilai from "./ModalTambahNilai";
import { deleteMinat } from "../actions/minat";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { useQueryClient } from "@tanstack/react-query";
import ModalEditFoto from "./ModalEditFoto";
import { deleteNilai } from "../actions/nilai";

const CardProfile = ({ user, jurusan, nilai, rekomendasiJurusan }) => {
  const nilai2 = [];
  const nilaiSem1 = nilai.filter((item) => item.semester === 1);
  const nilaiSem2 = nilai2.filter((item) => item.semester === 2);
  const hapusMinat = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda Yakin ?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    // Check if the user confirmed
    if (result.isConfirmed) {
      const { message, error } = await deleteMinat(id);
      if (error) {
        await Swal.fire({
          title: "Gagal!",
          text: error,
          icon: "error",
        });
      }
      if (message) {
        await Swal.fire({
          title: "Deleted!",
          text: message,
          icon: "success",
        });
        // Show success message
      }
    }
  };

  const hapusNilai = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda Yakin ?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    // Check if the user confirmed
    if (result.isConfirmed) {
      const { message, error } = await deleteNilai(id);
      if (error) {
        await Swal.fire({
          title: "Gagal!",
          text: error,
          icon: "error",
        });
      }
      if (message) {
        await Swal.fire({
          title: "Deleted!",
          text: message,
          icon: "success",
        });
        // Show success message
      }
    }
  };

  const query = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: hapusMinat,
    onSuccess: () => {
      query.invalidateQueries("minat");
    },
  });

  const mutation = useMutation({
    mutationFn: hapusNilai,
    onSuccess: () => {
      query.invalidateQueries("nilai");
    },
  });
  return (
    <div>
      <div className="grid lg:grid-cols-4 grid-cols-1 font-Poppins">
        <div className="m-auto w-full flex justify-items-end h-full col-span-1">
          <ModalEditFoto />
          <Avatar
            classNames={{
              base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
              icon: "text-black/80",
            }}
            className="m-auto w-48 h-48"
            icon={<AvatarIcon />}
          />
        </div>
        <div className="mt-6 w-full max-w-4xl mx-auto rounded-2xl shadow-lg bg-white p-6 col-span-3">
          <table className="space-y-4 shadow-lg w-full text-sm text-left text-[#123FC6] bg-white rounded-xl">
            <tbody>
              <tr className="">
                <td className="text-xl font-bold text-[#123FC6]">Nama</td>
                <td className="text-xl font-bold text-[#123FC6]">:</td>
                <td className="text-xl font-bold text-[#123FC6]">
                  {" "}
                  {user?.name}
                </td>
              </tr>
              <tr>
                <td className="text-xl font-bold text-[#123FC6]">Email</td>
                <td className="text-xl font-bold text-[#123FC6]">:</td>
                <td className="text-xl font-bold text-[#123FC6]">
                  {user?.email}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6 w-full max-w-4xl mx-auto rounded-2xl shadow-lg bg-white p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold font-Poppins text-blue-600">
                Jurusan Pilihan
              </h2>
              <ModalTambahMinat userId={user?.id} />
            </div>
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              {jurusan.length !== 0 ? (
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-6 py-3 font-semibold text-gray-800">
                        Nama Jurusan
                      </th>
                      <th className="px-6 py-3 text-center font-semibold text-gray-800">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {jurusan.map((item) => (
                      <tr key={item.id} className="hover:bg-blue-50">
                        <td className="px-6 py-4 text-gray-900">
                          {item.minat}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Button
                            isIconOnly
                            className="text-white bg-red-500 hover:bg-red-600 rounded-full p-2 transition focus:ring focus:ring-red-200"
                            onClick={() => mutate(item.id)}
                          >
                            <Trash size="16" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-xl text-[#123FC6] font-Poppins">
                  Belum ada jurusan pilihan
                </p>
              )}
            </div>
            {jurusan.length !== 0 ? null : (
              <div className="flex gap-2">
                <Chip color="primary">
                  Rekomendasi Jurusan :{rekomendasiJurusan}
                </Chip>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-2xl font-bold font-Poppins text-center mb-8 text-[#123FC6]">
          Nilai Mata Pelajaran
        </p>
        <ModalTambahNilai user={user} />
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 shadow-lg">
          {nilaiSem1.length === 0 && <p>Belum Ada Nilai</p>}
          <div className="shadow-lg px-8 bg-white rounded-lg">
            <p className="text-center text-xl mb-4 text-[#123FC6] font-Poppins">
              Semester 1
            </p>
            {nilaiSem1.length !== 0 && 
            <table className="w-full text-sm text-left text-[#123FC6] bg-white  rounded-xl">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-800">
                    Mata Pelajaran
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-800">
                    Nilai
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-800">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="">
                {nilaiSem1.map((item) => (
                  <tr key={item.id} className="">
                    <td className="  px-6 py-1 font-medium">
                      {item.mata_pelajaran}
                    </td>
                    <td className="  px-6 py-1 font-medium">{item.nilai}</td>
                    <td className="px-6 py-1 text-center">
                      <Button
                        isIconOnly
                        className=" text-white bg-red-500 hover:bg-red-600 rounded-lg transition"
                        onClick={() => mutation.mutate(item.id)}
                      >
                        <Trash size={"15"} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            }
          </div>
          <div className="shadow-lg px-8 bg-white rounded-lg">
           {nilaiSem2.length === 0 && <p className="text-center text-xl text-[#123FC6]">Belum Ada Nilai</p>}
            <p className="text-center text-xl mb-4 text-[#123FC6] font-Poppins">
              Semester 2
            </p>{" "}
            {nilaiSem2.length !== 0 && 
            <table className="w-full text-sm text-left text-[#123FC6] bg-white  rounded-xl">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-800">
                    Mata Pelajaran
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-800">
                    Nilai
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-800">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {nilaiSem2.map((item) => (
                  <tr key={item.id} className="">
                    <td className="  px-6 py-1 font-medium">
                      {item.mata_pelajaran}
                    </td>
                    <td className="  px-6 py-1 font-medium">{item.nilai}</td>
                    <td className="px-6 py-1 text-center">
                      <Button
                        isIconOnly
                        className=" text-white bg-red-500 hover:bg-red-600 rounded-lg transition"
                        onClick={() => mutation.mutate(item.id)}
                      >
                        <Trash size={"15"} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProfile;
