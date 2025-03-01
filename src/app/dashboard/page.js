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
import { useQuery } from "@tanstack/react-query";
import { getNilaiBySemester } from "../actions/nilai";
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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page H",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page I",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page J",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page K",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page L",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
];

const Dashboard = () => {
  const fetchDataUser = async () => {
    const { user, error } = await getUser();

    if (error) {
      alert(error);
    }
    return user;
  };

  const fetchNilaiBySemester = async () => {
    const { nilai, error } = await getNilaiBySemester();
    if (error) {
      alert(error);
    }
    return nilai;
  };

  const fetchTop3Minat = async () => {
    const { minat, error } = await top3Minat();
    if (error) {
      alert(error);
    }
    return minat;
  };

  const dataUser = useQuery({
    queryKey: ["user"],
    queryFn: fetchDataUser,
  });

  const dataNilaiSemester = useQuery({
    queryKey: ["nilai"],
    queryFn: fetchNilaiBySemester,
  });

  const dataTop3Minat = useQuery({
    queryKey: ["minat"],
    queryFn: fetchTop3Minat,
  });
  console.log(dataTop3Minat.data);

  const rata_rata = (data, semester) => {
    const filteredData = data.filter((item) => item.semester === semester);
    const totalNilai = filteredData.reduce((acc, curr) => acc + curr.nilai, 0);
    return filteredData.length > 0 ? totalNilai / filteredData.length : 0;
  };

  return (
    <div className="lg:w-full bg-blue-50">
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
              <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="pv"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
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
