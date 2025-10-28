"use client"
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast"
import Game from "@/models/gameModel";

export default function ReviewsPage() {
    const router = useRouter()
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const getReviews = async () => {
        setLoading(true)
        const response = await axios.get('/api/reviews')
        setData(response.data.reviews)
        toast.success("Retrieved Reviews")
        setLoading(false)

    }


    useEffect(() => {
        getReviews()
    }, [])

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>Reviews</h1>
                <h2>{loading ? "Loading Reviews..." : ""}</h2>
                {<div className="Reviews">
                    {data.map(review => (
                        <Link href={`/reviews/${review._id.toString()}`} key={review._id} className="review">
                            <p>{review.title}</p>
                            <p>Rating: {review.rating} /5</p>
                        </Link>
                    ))}
                </div>}
                <button> <Link href={'/reviews/newreview'}>Add a Review </Link></button>
            </div>
        </>
    )
}
