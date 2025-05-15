import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { email, projectId, role } = await req.json()

    const user = await db.user.findUnique({
        where: { email }
    })

    if (!user) {
        return NextResponse.json({ error: "user Not Found" }, { status: 404 })
    }

    const existingMember = await db.membership.findFirst({
        where: {
            userId: user?.id,
            projectId
        }
    });

    if (existingMember) {
        return NextResponse.json({ messgae: "user already member" }, { status: 400 })
    }

    await db.membership.create({
        data: {
            userId: user.id,
            projectId,
            role: role === "admin" ? "admin" : "member"
        }
    });
    return NextResponse.json({ message: "User invited sucessfully" })

}