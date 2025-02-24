'use server'

const { prisma } = require("@/lib/prisma")


export const getNilai = async ()=>{
    try {
        const nilai = await prisma.nilai.findMany();
        return {nilai}
    } catch (error) {
        return {error:error.message}
        
    }
}

export const createNilai = async ({data})=>{
    try {
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Data harus berupa array dan tidak boleh kosong.");
        }
        for (const item of data) {
            if (item.mata_pelajaran === "" || !item.nilai === 0 || !item.semester === 0 || item.userId === "") {
                throw new Error("Data Tidak Lengkap");
            }
        }
        const nilai = await prisma.nilai.createMany({
            data,
        });
        return {message:"Nilai Created"}
    } catch (error) {
        return {error:error.message}
    }
}

export const getNilaiByIdUser = async (id)=>{
    try {
        const nilai = await prisma.nilai.findMany({
            where:{
                userId:id
            }
        })
        return {nilai}
    } catch (error) {
        return {error:error.message}
    }
}

export const deleteNilai = async (id)=>{
    try {
        const nilai = await prisma.nilai.delete({
            where:{
                id:id
            }
        })
        return {message:"Nilai Deleted"}
    } catch (error) {
        return {error:error.message}
    }
}