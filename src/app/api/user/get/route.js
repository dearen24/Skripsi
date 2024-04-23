import db from '../../../../modules/db'
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";

export async function GET(req,res) {
    const user = await db.user.findMany({
        include:{
            role: true,
        }
    });

    return NextResponse.json({user});
}