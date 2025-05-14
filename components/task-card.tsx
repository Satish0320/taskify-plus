"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function TaskCard({ 
    task
 }: { 
    task: { id: string, title: string, description: string | null, status: string } 
}) {
    const [status, setStatus] = useState(task.status)
    const router = useRouter();

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        setStatus(newStatus);

        await fetch("/api/task/status", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ taskId: task.id, status: newStatus })
        });

        router.refresh()
    }

    return (
        <div className="bg-white p-4 rounded shadow space-y-1">
            <h3 className="font-semibold"> {task.title} </h3>
            <p className="text-sm text-gray-600"> {task.description} </p>
            <select value={status}
                onChange={handleStatusChange}
                className="mt-2 block w-full border rounded p-1 text-sm"
            >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
            </select>
        </div>
    )
}