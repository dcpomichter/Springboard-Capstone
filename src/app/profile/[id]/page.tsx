"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link"
import { toast } from "react-hot-toast";
import Loading from "@/app/components/Loading";



export default function UserProfile({ params }: any) {
    const router = useRouter()
    const [data, setData] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    const logout = async () => {
        try {
            const response = await axios.get('/api/users/logout')
            toast.success("Logout Success")
            router.push('/login')
        }
        catch (error: any) {
            toast.error("Logout Failed, " + error.message)
        }
    };

    const getUserDetails = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/users/me')
            setData(response.data.user)
            toast.success("User Data Retrieved")
        }
        catch (error: any) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <div className="flex flex-col justify-center min-h-screen py-2 profile">
            {loading ? <Loading message="Loading..." /> :
                <>
                    <h1 className=" flex flex-col items-center text-2xl font-bold">Profile for: {data._doc.username}</h1>
                    <div className="flex flex-col">
                        <p>Email: {data._doc.email}</p>
                        <p>Verified Status: {data._doc.isVerified ? "Verified" : "Not Verified"}</p>
                        <p>Admin Status: {data._doc.isAdmin ? "Administrator" : "User"}</p>
                    </div>
                    <div className="flex flex-col columns-2 games">
                        <h3>Library</h3>
                        {data.library.map(game => (
                            <div className="game" key={game._id.toString()}>
                                <Link href={`/games/${game._id.toString()}`} key={game._id}>
                                    <p className="title-row">{game.title}</p>
                                    <p className="category-tag">Category: {game.category}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col columns-2 games">
                        <h3>Reviews</h3>
                        {data.reviews.map(review => (
                            <div className="game" key={review._id.toString()}>
                                <Link href={`/reviews/${review._id.toString()}`} key={review._id} >
                                    <p className="title-row title">{review.title}</p>
                                    <p className="ratings-row rating-text"> Rating: {review.rating}/5
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            }
            <button onClick={logout} className="flex flex-col content-center items-center">Logout</button>
        </div>
    )
}
