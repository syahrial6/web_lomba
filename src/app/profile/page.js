
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Loading from "../components/Loading";


const Profile = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role === "user") {
    redirect(`/profile/${session.user.id}`);
  }

  if (session.user.role === "admin") {
    redirect("/dashboard");
  }

  return <Loading />;
};

export default Profile;

