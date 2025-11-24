"use client"

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect } from 'react';

export default function VerifyEmailPage() {
    const [token, setToken] = React.useState("");
    const [verified, setVerified] = React.useState(false)
    const [errors, setErrors] = React.useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
            setVerified(true)
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

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl title'>Verify Email</h1>

            {verified && (
                <div>
                    <h2>Email Verified</h2>
                    <Link href={'/login'}>Login</Link>
                </div>
            )}
            {errors && (
                <div>
                    <h2 className='text-2xl bg-red-500 text-black'>Error</h2>
                </div>
            )}

        </div>
    )
}
