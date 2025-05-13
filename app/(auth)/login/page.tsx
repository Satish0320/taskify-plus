"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react"


export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]:e.target.value })
    }

    const handleSubmit = async () => {
        const res = await signIn("credentials",{
            ...form,
            redirect:false
        });

        if (res?.ok) {
            router.push("/dashboard")
        }else{
            setError("Invalid email or password ")
        }
    }

    return (    
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
                <h2 className="font-bold text-xl text-center text-black">
                    Login
                </h2>
                <input type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
                />
                 <input type="password"
                 name="password"
                placeholder="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
                />
                {error && <p className="text-red-400"> {error} </p>}
                <button
                onClick={handleSubmit}
                className="bg-blue-500 w-full text-white p-2 rounded hover:bg-blue-700"
                >Login</button>
            </div>
        </div>
    )
}