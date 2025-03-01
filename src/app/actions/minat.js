'use server'



const { prisma } = require("@/lib/prisma")


export const createMinat = async(data)=>{
    try {
        const jumlah = await prisma.minat.count({
            where:{
                userId:data.userId
            }
        })
        if (jumlah >= 3) {
            return {error:"Jumlah Minat Maksimal 3"}
        }

        const response = await prisma.minat.create({
            data:{
                userId:data.userId,
                minat:data.minat
            }
        })
        return {message:"Minat Berhasil Ditambahkan",jumlah}
    } catch (error) {
        return {error:error.message}
    }
}
export const getMinat = async()=>{
    try {
        const minat = await prisma.minat.findMany();
        return {minat}
    } catch (error) {
        return {error:error.message}
    }
}

export const top3Minat = async()=>{
    try {
        const minat = await prisma.minat.groupBy({
            by:["minat"],
            _count:{
                minat:true
            },
            orderBy: {
                _count: {
                  minat: "desc",
                },
              },
            take:3
        })
        return {minat}
    } catch (error) {
        return {error:error.message}
    }
}

export const getMinatByIdUser = async(userId)=>{
    try {
        const minat = await prisma.minat.findMany({
            where:{
                userId:userId
            }
        })
        if (!minat) {
            return {error:"Minat Not Found"}
        }
        return {minat}
    } catch (error) {
        return {error:error.message}
        
    }
}

export const deleteMinat = async(id)=>{
    try {
        const minat = await prisma.minat.delete({
            where:{
                id:id
            }
        })
        return {message:"Minat Berhasil Dihapus"}
    } catch (error) {
        return {error:error.message}
        
    }
}