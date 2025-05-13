import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({
                message: "Missing Fields"
            }, { status: 400 })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const existingUser = await db.user.findUnique({
            where: {
                email
            }
        })
        if (existingUser) {
            return NextResponse.json({
                Message: "Email Already Exist"
            }, { status: 409 })
        }

        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        })
        return NextResponse.json({ user }, { status: 201 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}