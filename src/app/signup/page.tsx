"use client";

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast'

export default function SignupPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisabled, setbuttonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user);
            toast.success("Signup success")
            router.push("/login")
        }
        catch (error: any) {
            toast.error("Signup Failed" + error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
            setbuttonDisabled(false)
        } else {
            setbuttonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2" >
            <h1>{loading ? "Procesing..." : "Sign Up!"}</h1>
            <hr />
            <label htmlFor='username'>Username</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='username'
                type='text'
                value={user.username}
                onChange={(evt) => setUser({ ...user, username: evt.target.value })}
                placeholder='username'
            />
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
            <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' onClick={onSignup}>{buttonDisabled ? "No Signup" : "Signup"}</button>
            <Link href='/login'>Visit Login Page</Link>
        </div>
    )
}
