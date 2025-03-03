"use client";
import { ChartArea, User } from "lucide-react";
import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Rectangle,
  Legend,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { getUser } from "../actions/user";
import { useQueries } from "@tanstack/react-query";
import { getNilaiBySemester, getRatarataPelajaran } from "../actions/nilai";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { top3Minat } from "../actions/minat";
import Loading from "../components/Loading";
import NavbarComponent from "../components/Navbar";



const Dashboard = () => {
  
  const fetchDataUser = async () => {
    const start = performance.now();
    const { user, error } = await getUser();
    const end = performance.now();
    console.log("Time to fetch user", end - start);
    if (error) {
      alert(error);
    }
    return user;

  };

  const fetchNilaiBySemester = async () => {
    const start = performance.now();
    const { nilai, error } = await getNilaiBySemester();
    const end = performance.now();
    console.log("Time to fetch nilai", end - start);
    if (error) {
      alert(error);
    }
    return nilai;
  };

  const fetchTop3Minat = async () => {
    const start = performance.now();
    const { minat, error } = await top3Minat();
    const end = performance.now();
    console.log("Time to fetch minat", end - start);
    if (error) {
      alert(error);
    }
    return minat;
  };

  const fetchRataNilaPelajaran = async () => {
    const start = performance.now();
    const { nilai, error } = await getRatarataPelajaran();
    const end = performance.now();
    console.log("Time to fetch rata nilai", end - start);
    if (error) {
      alert(error);
    }
    const formatData = nilai.map((item) => ({
      mata_pelajaran: item.mata_pelajaran,
      avg: item._avg.nilai,
    }));
    return formatData;
  };

  

  const results = useQueries({
    queries: [
      { queryKey: ["user"], queryFn: fetchDataUser },
      { queryKey: ["nilaiSemester"], queryFn: fetchNilaiBySemester },
      { queryKey: ["minat"], queryFn: fetchTop3Minat },
      { queryKey: ["nilai"], queryFn: fetchRataNilaPelajaran },
    ],
  });  
  const [dataUser, dataNilaiSemester, dataTop3Minat, dataRataNilai] = results;

  

  const rata_rata = (data, semester) => {
    const filteredData = data.filter((item) => item.semester === semester);
    const totalNilai = filteredData.reduce((acc, curr) => acc + curr.nilai, 0);
    return filteredData.length > 0 ? totalNilai / filteredData.length : 0;
  };

  return (
    <div className="lg:w-full bg-blue-50">
      <NavbarComponent/>
      <div className="p-4">
        <p className="text-2xl font-Poppins font-bold ">
          Selamat Datang, Admin{" "}
        </p>
        <p className="text-lg font-Poppins  ">
          Semua Sistem Berjalan Dengan Baik{" "}
        </p>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-blue-200 w-full p-4 rounded-lg mt-4">
            <img src="/images/dashboard.png" className="w-64 h-64 m-auto" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#5c97f7] w-full p-4 rounded-lg mt-4">
              <p className="text-lg text-white font-bold font-Poppins">
                <User size={"30"} />
                Total User
              </p>
              <div className="h-full">
                <p className="text-3xl text-white font-bold font-Poppins">
                  {dataUser.data?.length}
                </p>
              </div>
            </div>
            <div className="bg-[#201196] w-full p-4 rounded-lg mt-4">
              <p className="text-lg font-bold text-white font-Poppins">
                <ChartArea size={"30"} />
                Rata-Rata Semester 1
              </p>
              <div className="h-full">
                {dataNilaiSemester.isLoading && (
                  <p className="text-xl text-white font-Poppins">Loading</p>
                )}
                {dataNilaiSemester.data && (
                  <p className="text-3xl text-white font-bold font-Poppins">
                    {rata_rata(dataNilaiSemester.data, 1).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
            <div className="bg-[#a361ed] w-full p-4 rounded-lg ">
              <p className="text-lg font-bold font-Poppins text-white flex gap-2">
                <User size={"40"} />
                Total Peminatan
              </p>
              <div className="h-full">
                <p className="text-3xl font-bold text-white font-Poppins">
                  346
                </p>
              </div>
            </div>
            <div className="bg-[#de3a5b] w-full p-4 rounded-lg ">
              <p className="text-lg font-bold text-white font-Poppins">
                <ChartArea size={"30"} />
                Rata-Rata Semester 2
              </p>
              <div className="h-full">
                {dataNilaiSemester.isLoading && (
                  <p className="text-xl text-white font-Poppins">Loading</p>
                )}
                {dataNilaiSemester.data && (
                  <p className="text-3xl text-white font-bold font-Poppins">
                    {rata_rata(dataNilaiSemester.data, 2).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg">
            <p className="text-2xl font-Poppins font-bold py-4 text-blue-400 text-center">
              Grafik Nilai Rata-Rata Pelajaran
            </p>
            <div className="m-auto">
              {dataRataNilai.isLoading ? <Loading />:(
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  width={500}
                  height={300}
                  data={dataRataNilai.data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mata_pelajaran" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="avg"
                    fill="#457aff"
                    activeBar={<Rectangle fill="blue" stroke="blue" />}
                  />
                </BarChart>
              </ResponsiveContainer>
              )}
            </div>
          </div>
          <div className="bg-white rounded-lg">
            <p className="text-2xl font-Poppins font-bold py-4 text-blue-400 text-center">
              Top 3 Peminatan
            </p>
            {dataTop3Minat.isLoading ? (
              <Loading />
            ) : (
              <Table className="w-[90%] m-auto font-Poppins shadow-lg mb-12">
                <TableHeader>
                  <TableColumn className="w-[70%]">Minat Kuliah</TableColumn>
                  <TableColumn className="w-[30%]">Jumlah</TableColumn>
                </TableHeader>
                <TableBody>
                  {dataTop3Minat.data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.minat}</TableCell>
                      <TableCell>{item._count.minat}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
