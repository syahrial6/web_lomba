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
import {  Trash2 } from "lucide-react";
import { getUser } from "@/app/actions/user";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/components/Loading";


const User = () => {
  const fetchDataUser = async () => {
    const { user, error } = await getUser();
    if (error) {
      console.log(error);
    }
    return user;
  };

  const queryUser = useQuery({
    queryKey: ["user"],
    queryFn: fetchDataUser,
  });

  
  return (
    <div className=" h-screen lg:w-[83vw] bg-slate-200">
      <h1 className="text-center text-2xl font-bold py-12">User</h1>
      <div className="overflow-x-auto">
        {queryUser.isLoading ? (
          <Loading />
        ) : (
          <Table
            color="blue"
            className="w-[70vw] m-auto"
            aria-label="Example static collection table"
          >
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>AKSI</TableColumn>
            </TableHeader>
            <TableBody>
              {queryUser.data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell className="w-[50px]">
                    <Button isIconOnly className="bg-red-600 text-white">
                      <Trash2 />
                    </Button>
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

export default User;
