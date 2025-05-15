import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest){
    const session = await getServerSession(authOptions)
    if (!session?.user.id) {
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }

    const {taskId , status} = await req.json();
    
    if (!taskId || !status) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const updated = await db.task.update({
        where:{
            id: taskId
        },data:{
            status
        }
    })
    return NextResponse.json(updated,{status:200})
}