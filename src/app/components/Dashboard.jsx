import { Card, CardBody } from "@heroui/react";
import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const Dashboard = ({ nilai }) => {
  const nilaiSem1 = nilai.filter((item) => item.semester === 1);
  const nilaiSem2 = nilai.filter((item) => item.semester === 2);

  const rata_rataSem1 =
    nilaiSem1.reduce((acc, item) => acc + item.nilai, 0) / nilaiSem1.length || 0;
  const rata_rataSem2 =
    nilaiSem2.reduce((acc, item) => acc + item.nilai, 0) / nilaiSem2.length || 0;
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
      <div className="m-auto w-full">
        <p className="text-2xl font-Poppins font-bold text-center">
          Grafik Semester 1
        </p>
        <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          className=""
          width={500}
          height={400}
          data={nilaiSem1}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="mata_pelajaran"
            scale="band"
            angle={-90}
            textAnchor="end"
            dy={10}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="nilai" barSize={10} fill="#413ea0" />
          <Line type="monotone" dataKey="nilai" stroke="#ff7300" />
        </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="m-auto w-full">
        <p className="text-2xl font-Poppins font-bold text-center">
          Grafik Semester 2
        </p>
        <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          className=""
          width={500}
          height={400}
          data={nilaiSem2}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="mata_pelajaran"
            scale="band"
            angle={-90}
            textAnchor="end"
            dy={10}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="nilai" barSize={10} fill="#413ea0" />
          <Line type="monotone" dataKey="nilai" stroke="#ff7300" />
        </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div>
        <Card>
          <CardBody>
            Rata-rata Nilai Semester 1:
            <span className="font-bold block"> {rata_rataSem1.toFixed(2)}</span>
          </CardBody>
        </Card>
      </div>
      <div>
        <Card>
          <CardBody>
            Rata-rata Nilai Semester 2:{" "}
            <span className="font-bold block">{rata_rataSem2.toFixed(2)}</span>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
