"use client"
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast"
import Game from "@/models/gameModel";
import Loading from "../components/Loading";

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
                <h1 className="title">Reviews</h1>
                {loading ? <Loading message="Loading Reviews..." /> : ""}
                {data.map((review: any) => {
                    return (
                        <div className="game" key={review._id} >
                            <Link href={`/reviews/${review._id.toString()}`} >
                                <p>{review.title}</p>
                            </Link>
                            <p>Rating: {review.rating} /5</p>
                        </div>
                    )
                })}
                <button> <Link href={'/reviews/newreview'}>Add a Review </Link></button>
            </div>
        </>
    )
}
