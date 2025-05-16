"use client";

import CreateProjectForm from "@/components/CreateProjectForm";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [projects, setprojects] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const fetchProjects = async () => {
    const res = await fetch("/api/project/all");
    const data = await res.json();
    setprojects(data.projects || []);
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchProjects()
    }
  }, [status])

  if (status === "loading") return <p>Loading...</p>
  if (!session) return <p className="text-center text-red-500">Please log in to view your dashboard.</p>

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold"> {session?.user.name} Your Projects </h1>
        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-800"
          onClick={() => setShowForm(true)}
        > + New Project </button>
      </div>

      {showForm && (
        <CreateProjectForm onClose={() => {
          setShowForm(false);
          fetchProjects()
        }} />
      )}
      {projects.length === 0 ? (
        <p>No projects found. Create or accept an invite.</p>
      ) : (
        <ul className="space-y-2">
          {projects.map((project) => (
            <li key={project.id} className="p-3 bg-white rounded hover:bg-gray-50 transition">
              <Link href={`/board/${project.id}`}>
                <div className="font-semibold text-black">
                  {project.name}
                </div>
              </Link>

              <Link href={`/dashboard/${project.id}/invite`}>
                <button className="ml-4 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700">
                  Invite
                </button>
              </Link>

            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

