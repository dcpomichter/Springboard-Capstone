"use client";

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast'

export default function LogoutPage() {
    const router = useRouter()
    const [loading, setLoading] = React.useState(true)


    const logout = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/users/logout')
            toast.success("Logout Success")
            router.push('/login')
        }
        catch (error: any) {
            toast.error("Logout Failed, " + error.message)
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        logout()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2" >
            {loading ? <h1>Logging Out...</h1> : <h1>Log out attempted</h1>}
        </div>
    )
}
