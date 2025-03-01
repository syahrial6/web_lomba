"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/components/Loading";
import { getUser } from "@/app/actions/user";

const Nilai = () => {
  const fetchDataNilai = async () => {
    const { user, error } = await getUser();
    console.log(user);
    if (error) {
      console.log(error);
    }
    return user;
  };

  const queryUser = useQuery({
    queryKey: ["user"],
    queryFn: fetchDataNilai,
  });

  const rata_rata = (data, semester) => {
    const filteredData = data.filter((item) => item.semester === semester);
    const totalNilai = filteredData.reduce((acc, curr) => acc + curr.nilai, 0);
    return filteredData.length > 0 ? totalNilai / filteredData.length : 0;
  };

  return (
    <div className=" h-screen lg:w-[83vw] bg-blue-50">
      <h1 className="text-center text-2xl font-bold py-12">Nilai Siswa</h1>
      <div className="overflow-x-auto">
        {queryUser.isLoading ? (
          <Loading />
        ) : (
          <Table
            color="danger"
            className="w-[70vw] m-auto"
            aria-label="Example static collection table"
          >
            <TableHeader >
              <TableColumn>NO</TableColumn>
              <TableColumn>NAMA SISWA</TableColumn>
              <TableColumn>MINAT</TableColumn>
              <TableColumn>RATA-RATA SEMESTER 1</TableColumn>
              <TableColumn>RATA-RATA SEMESTER 2</TableColumn>
           
            </TableHeader>
            <TableBody>
              {queryUser.data?.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {" "}
                    {item.Minat?.map((list) => (
                      <li key={list.minat}>{list.minat}</li>
                    ))}
                  </TableCell>
                  <TableCell>
                    {rata_rata(item.Nilai, 1).toFixed(1)}
                  </TableCell>

                  <TableCell>
                    {rata_rata(item.Nilai, 2).toFixed(1)}
                  </TableCell>

                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Nilai;
