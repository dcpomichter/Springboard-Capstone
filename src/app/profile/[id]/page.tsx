"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link"
import { toast } from "react-hot-toast";



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
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {loading ? <h1>Loading...</h1> :
                <>
                    <h1>Profile for: {data._doc.username}</h1>
                    <div>
                        <p>Email: {data._doc.email}</p>
                        <p>Verified Status: {data._doc.isVerified ? "Verified" : "Not Verified"}</p>
                        <p>Admin Status: {data._doc.isAdmin ? "Administrator" : "User"}</p>
                    </div>
                    <div className="games">
                        <h3>Library</h3>
                        {data.library.map(game => (
                            <div className="game">
                                <Link href={`/games/${game._id.toString()}`} key={game._id}>
                                    <p>{game.title}</p>
                                    <p>Category: {game.category}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="games">
                        <h3>Reviews</h3>
                        {data.reviews.map(review => (
                            <div className="game">
                                <Link href={`/reviews/${review._id.toString()}`} key={review._id} >
                                    <p>{review.title}</p>
                                    <p>Rating: {review.rating}/5</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            }
            <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center items-right mb-4">Logout</button>
        </div>
    )
}
