"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function TaskCard({
    task
}: {
    task: { id: string, title: string, description: string | null, status: string, assignee: string }
}) {
    const [status, setStatus] = useState(task.status)
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description || "")
    const [isEditing, setIsEditing] = useState(false)
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

    const handleUpdate = async () => {
        await fetch(`/api/task/${task.id}`, {
            method: "PATCH",
            body: JSON.stringify({ title, description }),
            headers: { "Content-Type": "application/json" }
        });
        setIsEditing(false);
        router.refresh()
    }

    const handleDelete = async () => {
        await fetch(`/api/task/${task.id}`, { method: "DELETE" })
        router.refresh()
    }

    return (

        <div className="bg-white 4 rounded shadow space-y-2">
            {isEditing ? (
                <>
                    <input value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded p-1 text-sm"
                    />
                    <textarea value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="text-sm w-full rounded border p-1"
                    />
                    <div className="flex gap-2 mt-1">
                        <button onClick={handleUpdate} className="bg-green-600 hover:bg-green-900 text-white px-2 py-1 rounded text-sm">Save</button>
                        <button onClick={() => setIsEditing(false)} className="text-sm">Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    {task.assignee && (
                        <p className="text-sm text-black font-extrabold">Assigned To:  {task.assignee.name} </p>
                    )}
                    <div className="flex justify-between">

                        <h3 className="font-semibold"> {task.title} </h3>
                        <div className="flex gap-2 text-sm">
                            <button onClick={() => setIsEditing(true)} className="text-blue-600">Edit</button>
                            <button onClick={handleDelete} className="text-red-600">Delete</button>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600"> {task.description} </p>
                </>
            )}
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