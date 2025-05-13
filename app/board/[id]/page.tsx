import TaskForm from "@/components/task-form";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";


export default async function BoardPage({ params }: { params: { id: string } }) {
    const project = await db.project.findUnique({
        where: {
            id: params.id,
        },
        include: {
            tasks: {
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    });

    if (!project) return notFound();

    return (
        <div className="min-h-screen p-6 bg-gray-100 text-black">
            <div className="max-w-5xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold"> {project.name} </h1>
                <TaskForm projectId={project.id} />
                {project.tasks.length === 0 ? (
                    <p className="text-gray-500">No tasks yet.</p>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {project.tasks.map((task) => (
                            <li key={task.id} className="bg-white p-4 rounded shadow">
                                <h2 className="font-semibold text-lg"> {task.title} </h2>
                                <p className="text-sm text-gray-600"> {task.description} </p>
                                <span className="inline-block mt-2 text-xs text-white px-2 py-1 rounded bg-blue-500">{task.status}</span>
                            </li>
                        ))}
                    </ul>
                )}

            </div>
        </div>
    )
}