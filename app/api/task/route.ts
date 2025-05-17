import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export  async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json();
    const { title, description, projectId,assigneeId } = body;

    if (!title || !projectId) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const task = await db.task.create({
        data:{
            title,
            description,
            projectId,
            assigneeId: assigneeId || null
        }
    })
    return NextResponse.json(task,{status:201})
}