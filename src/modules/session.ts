"use server"
import { NextAuthOptions, getServerSession } from "next-auth";
import db from "./db";
import { redirect, useRouter } from "next/navigation";
import { authConfig } from "./auth";

export async function getSessionServerAdmin() {
    let session = await getServerSession(authConfig);
    const role = await db.user.findFirst({
        where: {
            email: session?.user?.email as string
        },
        include: {
            role: true
        }
    });

    const semester = await db.semester.findFirst({
        where:{
            status:true,
        }
    });

    let sessionData = session?.user;

    if(sessionData!=undefined){
        sessionData.role = role?.role.nama;
        sessionData.semester = semester;
        sessionData.id = role?.id;
    }
    //tambahin juga buat semester yang lagi aktifnya abistu di pagenya diambil datanya dan di pass ke komponennya.
    //mungkin bisa juga functionya dipisah per role 
    if(!session||sessionData.role!="Admin"){
        return redirect("/");
    }
    else{
        return sessionData;
    }
}

export async function getSessionRole() {
    let session = await getServerSession(authConfig);
    const role = await db.user.findFirst({
        where: {
            email: session?.user?.email as string
        },
        include: {
            role: true
        }
    });

    return role?.role.nama;
}

export async function getSessionServerDosen() {
    let session = await getServerSession(authConfig);
    const role = await db.user.findFirst({
        where: {
            email: session?.user?.email as string
        },
        include: {
            role: true
        }
    });

    const semester = await db.semester.findFirst({
        where:{
            status:true,
        }
    });

    let sessionData = session?.user;

    if(sessionData!=undefined){
        sessionData.role = role?.role.nama;
        sessionData.semester = semester;
        sessionData.id = role?.id;
    }
    //tambahin juga buat semester yang lagi aktifnya abistu di pagenya diambil datanya dan di pass ke komponennya.
    //mungkin bisa juga functionya dipisah per role 
    if(!session){
        return redirect("/");
    }
    else{
        return sessionData;
    }
}