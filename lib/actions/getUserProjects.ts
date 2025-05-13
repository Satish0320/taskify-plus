import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { db } from "../db";



export async function getuserprojects(){
    const session = await getServerSession(authOptions);
    if(!session?.user.id) return[]

    const projects = await db.project.findMany({
        where:{
            members:{
                some:{
                    userId: session.user.id
                },
            },
        },
        orderBy:{
            createdAt:"desc",
        }
    });

    return projects;
}