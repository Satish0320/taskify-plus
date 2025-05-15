// "use client"

// // import CreateProjectForm from "@/components/CreateProjectForm";
// import { getuserprojects } from "@/lib/actions/getUserProjects";
// import { useSession } from "next-auth/react"
// import { useState } from "react";
// import Link from "next/link";


// export default async function DashBoard(){
//     const {data:session} = useSession();
//     const [showForm, setShowForm] = useState(false)
//     const projects = await getuserprojects();

//     return (
//         <div className="min-h-screen p-6 bg-gray-100 text-black">
//             <div className="max-w-4xl mx-auto space-y-6">
//                 <h1 className="text-2xl font-bold text-center">
//                     Welcome, {session?.user.name || session?.user.email|| "User"}
//                 </h1>
//                 {/* <button
//                 onClick={()=>setShowForm(true)}
//                 className="bg-blue-400 text-white px-4 py-6 rounded hover:bg-blue-600">
//                     + Create Project
//                 </button>

//                 {showForm && (
//                     <CreateProjectForm onClose={()=>setShowForm(false)} />
//                 )} */}

//                 <Link 
//                 href= "#"
//                 className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
//                 >+Create</Link>
//                 <div>
//                     <h2 className="text-2xl font-semibold mt-6 mb-2">Your Projects</h2>
//                    <div>
//                     {projects.length === 0 ? (
//                         <p className="text-gray-600">No projects Found</p>
//                     ) : (
//                         <ul className="space-y-2 mt-4">
//                             {projects.map((project)=>(
//                                 <li key={project.id}>
//                                     <Link
//                                     href={`/board/${project.id}`}
//                                     className="block p-4 bg-white rounded shadow hover:bg-gray-500"
//                                     >
//                                     {project.name}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) }
//                    </div>
//                 </div>
//             </div>
//         </div>
//     )
// }



import { getuserprojects } from "@/lib/actions/getUserProjects";
import Link from "next/link";

export default async function DashboardPage() {
  const projects = await getuserprojects();
  // const {data:session} = useSession()

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-black">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold"> Your Projects</h1>

        <Link
          href="#"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          + Create Project
        </Link>

        <div>
          {projects.length === 0 ? (
            <p className="text-gray-600">No projects found.</p>
          ) : (
            <ul className="space-y-2 mt-4">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/board/${project.id}`}
                    className="block p-4 bg-white rounded shadow hover:bg-gray-50"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
