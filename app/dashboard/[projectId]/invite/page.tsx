"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"


export default function InvitePage({params}:{params:{projectId: string}}){
    const[email,setEmail] = useState("");
    const[role, setRole] = useState("member");
    const[message, setMessage] = useState("");
    const route = useRouter();

    const handleInvite =async(e: React.FormEvent) =>{
        e.preventDefault();

        const res =await fetch("/api/project/invite",{
            method:"POST",
            headers: {"Content-Type" : "application/json"},
            body:JSON.stringify({email,role, projectId:params.projectId})
        });

        const data = await res.json()
        setMessage(data.message || data.error);

        if (res.ok) {
            setEmail("")
            setRole("")
            route.refresh()
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white p-4 rounded shadow">
            <h2 className="text-sl font-bold mb-2 text-black">Invite User to Project</h2>
            <form 
            onSubmit={handleInvite}
            className="space-y-3">
                <input type="email" placeholder="User Email" className="text-black w-full border p-2 rounded" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                />
                <select className="w-full border p-2 rounded text-black"
                onChange={(e)=>setRole(e.target.value)}
                value={role}
                >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-800">Send Invite</button>
                {message && <p className="text-sm text-gray-700"> {message} </p>}
                </form>
        </div>
    )
}