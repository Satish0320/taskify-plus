"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"

interface TaskFormProps {
    projectId: string;
    members: {
        user: {
            id: string;
            name: string | null;
            email: string | null;
        };
    }[];
}

export default function TaskForm({ projectId, members }:TaskFormProps ) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const[assignedTo, setAssignedTo] = useState("")
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/task", {
            method: "POST",
            body: JSON.stringify({ title, description, projectId, assigneeId: assignedTo }),
            headers: { "Content-Type": "application/json" }
        })
        if (res.ok) {
            setTitle("");
            setDescription("")
            setAssignedTo("");
            router.refresh()
        }
    }

    return (
        <form onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow space-y-2">
            <input type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded"
                required
            />

            <textarea
                placeholder="Task Description (Optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-ful p-2 border rounded"
            />

            <select value={assignedTo}
            onChange={(e)=>setAssignedTo(e.target.value)}
            className="w-full p-2 border rounded"
            >
                <option value="">Assign to</option>
                {members.map((member)=>(
                    <option key={member.user.id} value={member.user.id}>
                        {member.user.name || member.user.email}
                    </option>
                ) )}
            </select>

            <button
                type="submit"
                className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-900"
            >Create Task</button>
        </form>
    )
}