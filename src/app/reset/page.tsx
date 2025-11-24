'use client';

import { sendEmail } from '@/helpers/mailer';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const [token, setToken] = React.useState("");
    const [password, setPassword] = React.useState("")
    const [reset, setReset] = React.useState(false)
    const [errors, setErrors] = React.useState(false)

    const resetPassword = async (evt: any) => {
        evt.preventDefault();
        try {
            await axios.post('/api/users/reset', { token, password })
            setReset(true)
            router.refresh()
        }
        catch (error: any) {
            setErrors(true);
            console.log(error)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    }, [])

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        await axios.post("/api/users/reset/request", { email })
        setSubmitted(true);
        toast.success('Reset Email sent')
    };

    return (
        <main className="flex items-center justify-center min-h-screen px-4">
            <div className="shadow-lg rounded-lg p-8 w-full max-w-md">

                <h1 className="title text-center mb-6">
                    Reset Your Password
                </h1>

                {token !== "" ?
                    (!reset ? <form onSubmit={resetPassword} className="space-y-6">
                        <label htmlFor='password'>Password</label>
                        <input
                            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                            id='password'
                            type='password'
                            value={password}
                            onChange={(evt) => setPassword(evt.target.value)}
                            placeholder='Password*'
                        />
                        <button
                            type="submit"
                        >
                            Reset Password
                        </button>
                    </form> :
                        (
                            <div className="text-center">
                                <p className="text-green-600 font-medium mb-4">
                                    Password reset!
                                </p>
                            </div>
                        )
                    )
                    :
                    (!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(evt) => setEmail(evt.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                                />
                            </div>

                            <button
                                type="submit"
                            >
                                Send Reset Link
                            </button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <p className="text-green-600 font-medium mb-4">
                                If an account with that email exists, a reset link has been sent.
                            </p>

                            <button
                                onClick={() => setSubmitted(false)}
                                className="text-blue-600 underline text-sm"
                            >
                                Send another reset link
                            </button>
                        </div>
                    ))}

                <div className="text-center mt-8">
                    <a href="/login" className="text-blue-600 underline text-sm">
                        Back to Login
                    </a>
                </div>

            </div>
        </main>
    );
}
