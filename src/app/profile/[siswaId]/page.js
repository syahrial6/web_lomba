"use client";
import React, { use, useEffect, useState } from "react";

import { Breadcrumbs, BreadcrumbItem, Button } from "@heroui/react";

import TabsComponent from "@/app/components/TabsComponent";
import CardProfile from "@/app/components/CardProfile";
import Dashboard from "@/app/components/Dashboard";
import { signOut, useSession } from "next-auth/react";
import Loading from "@/app/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { getMinatByIdUser } from "@/app/actions/minat";
import RekomendasiAi from "@/app/components/RekomendasiAi";
import { getNilaiByIdUser } from "@/app/actions/nilai";
import axios from "axios";
const StudentDashboard = ({ params }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [respon, setRespon] = useState(null);

 

  const fetchingData = async (userId) => {
    const { minat, error } = await getMinatByIdUser(session.user.userId);
    if (error) {
      alert(error);
    }
    return minat;
  };

  const fetchingDataNilai = async (userId) => {
    const { nilai, error } = await getNilaiByIdUser(session.user.userId);
    if (error) {
      alert(error);
    }
    return nilai;
  };

  const geminiAPI = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBbsl-2GZk_OrIJP0JXhtLwIFsMBWAgoy8",
        {
          contents: [
            {
              parts: [
                {
                  text: `Dengan nilai nilai ini ${JSON.stringify(
                    queryNilai?.data
                  )} saya belum memiliki jurusan tujuan untuk kuliah, maka berikan saya saran 3 jurusan kuliah hanya nama jurusan saja pisahkan dengan tanda koma jangan tambah narasi lain `,
                },
              ],
            },
          ],
        }
      );
      setRespon(response.data?.candidates[0].content.parts[0].text);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
 

  const queryMinat = useQuery({
    queryKey: ["minat"],
    queryFn: fetchingData,
  });

  const queryNilai = useQuery({
    queryKey: ["nilai"],
    queryFn: fetchingDataNilai,
  });

  useEffect(() => {
    geminiAPI();
  }, []);

  if (!session) {
    return (
      <div className="min-w-screen min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (queryMinat.isLoading || queryNilai.isLoading) {
    return (
      <div className="min-w-screen min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container w-[85vw]  m-auto mt-12">
      <p className="text-2xl text-blue-500 font-bold font-Poppins mb-4">
        Welcome Back ! {session?.user.name}
      </p>
      <Breadcrumbs color="primary">
        <BreadcrumbItem size="lg">Profile</BreadcrumbItem>
        <BreadcrumbItem size="lg" className="text-blue-300">
          {session?.user.name}
        </BreadcrumbItem>
      </Breadcrumbs>

      <TabsComponent
        profile={
          <CardProfile
          // rekomendasiJurusan={respon ? respon : <div className="flex items-center justify-center h-screen">
          //   <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          // </div>
          // }
            user={session?.user}
            jurusan={queryMinat?.data}
            nilai={queryNilai?.data}
          />
        }
        dashboard={<Dashboard nilai={queryNilai?.data} />}
        rekomendasi_ai={
          <RekomendasiAi nilai={queryNilai?.data} jurusan={queryMinat?.data} />
        }
      />
      <Button
        className="bg-red-500 text-white"
        onClick={() => signOut({ callbackUrl: "http://localhost:3000/login" })}
      >
        Log out
      </Button>
    </div>
  );
};

export default StudentDashboard;
