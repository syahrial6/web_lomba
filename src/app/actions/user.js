"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";
import { put } from "@vercel/blob";
import nodemailer from "nodemailer";
import { select } from "@heroui/theme";
import Nilai from "../dashboard/nilai/page";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "syr0606rial@student.untan.ac.id",
    pass: "ankapet06",
  },
});

const schema = z.object({
  title: z.string(),
  file: z
    .instanceof(File)
    .refine((file) => file.size < 1000000, {
      message: "File Harus Kurang dari 1MB",
    })
    .refine((file) => file.size < 0, {
      message: "File Harus Diisi",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "File Harus Berupa Gambar",
    }),
});

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

export const editAvatarUser = async (FormData) => {
  const validatedField = schema.safeParse(
    Object.fromEntries(FormData.entries())
  );
  if (!validatedField.success) {
    return { error: validatedField.error.flatten().fieldErrors };
  }
  const { image } = validatedField.data;
  const { url } = await put(image.name, image, {
    access: "public",
    multipart: true,
  });
  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        image: url,
      },
    });
    return { message: "Avatar Updated" };
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
      to: "syr06rial@gmail.com",
      subject: "Your OTP for Email Verification",
      text: `Your OTP is ${otp}. Valid for 10 minutes.`,
      html: htmlTemplate,
    };

    console.log("Mail Options:", mailOptions); // Debugging

    // 🔹 Kirim email dengan async/await
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return { message: "Email Sent" };
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
