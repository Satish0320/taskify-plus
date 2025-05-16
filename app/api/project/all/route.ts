import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET(){
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }

    const userId = session.user.id;

    const created = await db.project.findMany({
        where:{
            creatorId:userId
        }
    });

    const member = await db.membership.findMany({
        where:{userId},
        include:{project: true}
    })

    const all = [
        ...created,
        ...member.map((m)=>m.project)
    ]

    const uniqueProjects = Array.from(
        new Map(all.map((p)=>[p.id, p])).values()
    )

    return NextResponse.json({projects:uniqueProjects})
}