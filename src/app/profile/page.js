'use client'
import React, { useEffect } from "react";
import Loading from "../components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const cekLogin = async () => {
    if (status === "authenticated" && session !== null) {
      router.push(`/profile/${session.user.id}`);
    }
  };
  useEffect(() => {
    cekLogin();
  }, [status, session]);

  return (
    <div className="m-auto flex justify-center items-center h-screen w-screen">
      {status === "loading" && <Loading />}
    </div>
  );
};

export default Profile;
