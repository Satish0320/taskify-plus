import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }

    const {name} =await req.json();
    if (!name) {
        return NextResponse.json({ error: "Project name is required" }, { status: 400 }); 
    }

    try {
        const project = await db.project.create({
            data:{
                name,
                creatorId:session.user.id,
                members:{
                    create:{
                        userId:session.user.id,
                        role: "admin"
                    }
                }
            }
        });
         return NextResponse.json(project, { status: 201 });
    } catch (error) {
         return NextResponse.json({ error: "Failed to create project",  }, { status: 500 });
    }
}