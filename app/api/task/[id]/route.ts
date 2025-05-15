import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, description } = await req.json();

    const update = await db.task.update({
        where: {
            id: params.id
        }, data: {
            title,
            description
        }
    })
    return NextResponse.json(update, { status: 201 })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session?.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await db.task.delete({
        where: { id: params.id }
    })
    return NextResponse.json({ success: true });
}