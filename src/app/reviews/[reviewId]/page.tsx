"use client"
import Loading from "@/app/components/Loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function ReviewDetailsPage({ params }: any) {
    const router = useRouter()
    const [data, setData] = React.useState({})
    const [loading, setLoading] = React.useState(false)

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
                    <h1 className="text-2xl">{data.title}</h1>
                    <div className="game">
                        <p><span>Description:</span> {data.description}</p>
                        <p><span>Rating:</span> {data.rating}/5</p>
                        <p><span>Reviewer:</span> {data.reviewer}</p>
                        <p><span>Game:</span> {data.game}</p>
                    </div>

                </>}
        </div>
    )
}
