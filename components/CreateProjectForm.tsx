"use client";

// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateProjectForm({ onClose }: { onClose: () => void }) {
    const [name, setname] = useState("");
    const [error, seterror] = useState("");
    // const { data: session } = useSession();
    const router = useRouter();

    const handleSubmit = async () => {
        seterror("");
        if (!name) {
            seterror("Project name is required");
            return
        }

        const res = await fetch("/api/project", {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({ name })
        })

        if (!res.ok) {
            const data = await res.json();
            seterror(data.error || "Failed to create project")
        }

        onClose();
        router.refresh();
    }

    return (
        <div className="p-4 bg-white rounded shadow w-full max-w-sm">
            <h3 className="text-lg font-bold mb-2">Create New Project</h3>
            <input
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Project Name"
                className="w-full p-2 rounded mb-2 text-black"
            />
            {error && <p className="text-red-500 text-sm mb-2"> {error} </p>}

            <div className="flex justify-end space-x-2">
                <button
                    onClick={onClose}
                    className="px-3 py-1 text-sm rounded bg-gray-300 hover:bg-gray-500">Cancel</button>
                <button
                    onClick={handleSubmit}
                    className="px-3 py-1 text-sm rounded bg-blue-300 text-white hover:bg-blue-700"
                >
                    Create
                </button>
            </div>
        </div>
    )
}