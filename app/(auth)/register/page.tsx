"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function RegisterPage() {
    const [form, setForm] = useState({name:"", email:"", password:""})
    const[error, setError] = useState("");
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setForm({...form, [e.target.name]:e.target.value})
    };

    const handleSubmit =async ()=>{
        const res = await fetch("/api/auth/register",{
            method:"POST",
            body: JSON.stringify(form),
            headers:{"Content-type": "application/json"}
        });

        if (res.ok) {
            router.push("/auth/login")
        }else{
            const data = await res.json();
            setError(data.error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg:gray-100 p-4">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4">
                <h2 className="font-bold text-xl text-center text-black">Register</h2>
                <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 rounded border text-black"
                />
                <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 rounded border text-black"
                />
                <input
                name="password"
                type="password"
                placeholder="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 rounded border text-black"
                />
                {error && <p className="text-red-700"> {error} </p>}
                <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-800"
                >
                    Register
                </button>
            </div>
        </div>
    );
}