import TaskCard from "@/components/task-card";
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

    const grouped = {
        todo : project.tasks.filter((task)=> task.status === "todo"),
        inProgress: project.tasks.filter((task)=>task.status === "in-progress"),
        done: project.tasks.filter((task)=>task.status === "done"),
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100 text-black">
            <div className="max-w-6xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold"> {project.name} </h1>
                <TaskForm projectId={project.id} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {["todo", "inProgress", "done"].map((statusKey)=> (
                    <div key={statusKey}>
                       <h2 className="text-xl font-semibold capitalize mb-2"> 
                        {statusKey === "inProgress" ? "In Progress" : statusKey}
                         </h2> 
                         <div className="space-y-3">
                            {grouped[statusKey as keyof typeof grouped].length === 0 ? (
                                <p className="text-sm text-gray-500">No Tasks.</p>
                            ) :(
                                grouped[statusKey as keyof typeof grouped].map((task)=> (
                                    <div key={task.id} className="bg-white p-4 rounded shadow space-y-1">
                                    <TaskCard task={task} />
                                    </div>
                                ))
                            )}
                         </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}