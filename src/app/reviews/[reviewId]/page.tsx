"use client"
import Loading from "@/app/components/Loading";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function ReviewDetailsPage({ params }: any) {
    const router = useRouter()
    const [data, setData] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    const { reviewId } = React.use(params)

    const getReviewDetails = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`/api/reviews/${reviewId}`, { reviewId })
            setData(response.data.review)
            toast.success("Review Found")
        }
        catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getReviewDetails()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {loading ? <Loading message="Loading Review..." /> :
                <>
                    {console.log(data)}
                    <h1 className="text-2xl">{data.title}</h1>
                    <div className="game">
                        <p><span>Game:</span> <Link href={`/games/${data.game._id}`}>{data.game.title}</Link></p>
                        <p><span>Description:</span> {data.description}</p>
                        <p><span>Rating:</span> {data.rating}/5</p>
                        <p>Reviewer:<Link href={`/profile/${data.reviewer._id}`}>{data.reviewer.username}</Link> </p>

                    </div>

                </>}
        </div>
    )
}
