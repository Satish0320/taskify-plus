import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    const userId = session?.user.id

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { projectId, userId: targetUserId } = await req.json()

    if (!projectId || !targetUserId) {
        return NextResponse.json({ error: "Missing Fields" }, { status: 400 })
    }

    const membership = await db.membership.findFirst({
        where: {
            projectId,
            userId,
            role: "admin"
        }
    })

    if (!membership) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (userId === targetUserId) {
        return NextResponse.json({ error: "Cannot remove yourself" }, { status: 400 });
    }

    await db.membership.deleteMany({
        where: {
            projectId,
            userId: targetUserId
        }
    })
    return NextResponse.json({ success: true });
}

