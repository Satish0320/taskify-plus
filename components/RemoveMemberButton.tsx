"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function RemoveMemberButton({ projectId, userId }: {
    projectId: string,
    userId: string
}) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    const handleRemove =(e: React.FormEvent<HTMLFormElement>) =>{
         e.preventDefault();
        startTransition(async()=>{
            await fetch ("/api/member/remove",{
            method:"POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({projectId, userId})
        })
        router.refresh()
        })
    }

    return (
        <form
            onSubmit={handleRemove}>
            <button type="submit" disabled={isPending} className="text-red-600 text-sm hover:underline"> 
            {isPending ? "Removing..." : "Remove"}    
            </button>
        </form>
    )
}