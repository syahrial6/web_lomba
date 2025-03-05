"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";
import { put } from "@vercel/blob";
import nodemailer from "nodemailer";
import { select } from "@heroui/theme";
import Nilai from "../dashboard/nilai/page";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "syr0606rial@student.untan.ac.id",
    pass: "ankapet06",
  },
});

const schema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "File Harus Diisi",
    })
    .refine((file) => file.size < 1000000, {
      message: "File Harus Kurang dari 1MB",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "File Harus Berupa Gambar",
    }),
});


export const editAvatarUser = async (id, formData) => {
  const file = formData.get("file");

  const validatedField = schema.safeParse({ file });

  if (!validatedField.success) {
    console.log("Validation Error:", validatedField.error.flatten().fieldErrors);
    return { error: validatedField.error.flatten().fieldErrors };
  }

  const { url } = await put(file.name, file, {
    access: "public",
    multipart: true,
  });

  try {
    await prisma.user.update({
      where: { id },
      data: { image: url },
    });

    return { message: "Avatar Updated" };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: error.message };
  }
};


export const getUser = async () => {
  try {
    const user = await prisma.user.findMany({
      include: {
        Nilai: {
            select:{
                nilai:true,
                semester:true
            },
        },
        Minat:{
            select:{
                minat:true
            }
        }
      },
    
      omit: {
        password: true,
      },
    });
    return { user };
  } catch (error) {
    return { error: error.message };
  }
};

export const getUserbyId = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      return { error: "User Not Found" };
    }
    return { user };
  } catch (error) {
    return { error: error.message };
  }
};

export const createUser = async (data) => {
  const data_db = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (data_db) {
    return { error: "Akun Sudah Ada" };
  }
  if (data.password !== data.confPassword) {
    return { error: "Password Tidak Sama" };
  }
  const salt = 10;
  const hash = await bcrypt.hash(data.password, salt);
  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
        role: "user",
      },
    });
    return { message: "User Created", user: user };
  } catch (error) {
    return { error: error.message };
  }
};

export const verfiedEmail = async ({ id, otp }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      return { error: "User Not Found" };
    }
    if (user.otp === otp) {
      const updateUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    } else {
      return { error: "OTP Salah" };
    }

    return { message: "Email Verified" };
  } catch (error) {
    return { error: error.message };
  }
};



export const sendEmail = async (id) => {
  try {
    // 🔹 Generate OTP (6 digit angka)
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        otp: otp,
      },
    });

    const User = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!getUser) {
      return { error: "User Not Found" };
    }

    // 🔹 Template email
    const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .otp-code {
                    background: #007bff;
                    color: #fff;
                    padding: 10px 20px;
                    font-size: 24px;
                    font-weight: bold;
                    border-radius: 5px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>OTP Verification</h2>
                <p>Halo,</p>
                <p>Kode OTP Anda adalah:</p>
                <p class="otp-code">${otp}</p>
                <p>Jika Anda tidak meminta kode OTP ini, abaikan email ini.</p>
            </div>
        </body>
        </html>`;

    // 🔹 Opsi email
    const mailOptions = {
      from: "syr0606rial@student.untan.ac.id",
      to: User.email,
      subject: "Your OTP for Email Verification",
      text: `Your OTP is ${otp}. Valid for 10 minutes.`,
      html: htmlTemplate,
    };

  
    // 🔹 Kirim email dengan async/await
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return { message: "Kami Telah Mengirimkan Kode OTP Ke Email Anda" };
  } catch (error) {
    console.log("Error sending email:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!getUser) {
      return { error: "User Not Found" };
    }
    const deleteUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return { message: "User Deleted" };
  } catch (error) {
    return { error: error.message };
  }
};
