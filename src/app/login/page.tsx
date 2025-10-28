"use client";

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast'

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })

    const [buttonDisabled, setbuttonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user);
            toast.success("Login Success")
            router.push("/profile")
        }
        catch (error: any) {
            toast.error("Login Failed" + error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setbuttonDisabled(false)
        } else {
            setbuttonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2" >
            <h1>{loading ? "Processing..." : "Login!"}</h1>
            <hr />
            <label htmlFor='email'>Email</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='email'
                type='email'
                value={user.email}
                onChange={(evt) => setUser({ ...user, email: evt.target.value })}
                placeholder='email'
            />
            <label htmlFor='password'>Password</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='password'
                type='password'
                value={user.password}
                onChange={(evt) => setUser({ ...user, password: evt.target.value })}
                placeholder='password'
            />
            <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' onClick={onLogin}>{buttonDisabled ? "No Login" : "Login"}</button>
            <Link href='/signup'>Visit Signup Page</Link>
        </div>
    )
}
