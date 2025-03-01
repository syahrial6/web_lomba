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

export const getNilaiBySemester = async()=>{
    try {
        const nilai = await prisma.nilai.findMany()
        return {nilai}
    } catch (error) {
        return {error:error.message}
        
    }
}

export const createNilai = async ({data})=>{
    try {
        const nilai = await prisma.nilai.findMany({
            where:{
                userId:data.userId
            }
        })
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Data harus berupa array dan tidak boleh kosong.");
        }
        for (const item of data) {
            if (item.mata_pelajaran === "" || !item.nilai === 0 || !item.semester === 0 || item.userId === "") {
                throw new Error("Data Tidak Lengkap");
            }
            if (item.nilai < 0 || item.nilai > 100) {
                throw new Error("Nilai Harus Antara 0-100");
            }
            if (item.semester < 1 || item.semester > 2) {
                throw new Error("Semester Harus Antara 1-2");
            }
            if (nilai.some((nilai) => nilai.mata_pelajaran === item.mata_pelajaran && nilai.semester === item.semester && nilai.userId === item.userId)) {
                throw new Error(`Pelajaran ${item.mata_pelajaran} Sudah Ada Silahkan Di Cek Lagi`);
            }
        }
        await prisma.nilai.createMany({
            data,
        });
        return {message:"Nilai Created"}
    } catch (error) {
        return {error:error.message}
    }
}

export const getNilaiByIdUser = async (userId)=>{
    try {
        const nilai = await prisma.nilai.findMany({
            where:{
                userId:userId
            }
        })
        return {nilai}
    } catch (error) {
        return {error:error.message}
    }
}

export const getRatarataPelajaran = async ()=>{
    try {
        const nilai = await prisma.nilai.groupBy({
            by:["mata_pelajaran"],
            _avg:{
                nilai:true
            },

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