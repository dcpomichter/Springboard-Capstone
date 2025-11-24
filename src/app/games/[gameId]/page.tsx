"use client"
import Loading from "@/app/components/Loading";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function GameDetailsPage({ params }: any) {
    const router = useRouter()
    const [data, setData] = React.useState<any>({})
    const [loading, setLoading] = React.useState(true)

    const { gameId } = React.use<any>(params)

    const getGameDetails = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`/api/games/${gameId}`, { gameId })
            setData(response.data.game)
            toast.success('Game Data Retrieved')
        }
        catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getGameDetails()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {loading ? <Loading message="Loading Game..." /> :
                <>
                    <h1 className="text-2xl title-row title">{data._doc.title}</h1>
                    <div className="game">
                        <p className="categories">
                            <span>Category:</span> <span className="category-tag">{data._doc.category || "Unknown"}</span>
                        </p>
                        <p><span>Number of Player:</span> {data._doc.numberOfPlayers || "Unknown"}</p>
                        <p className="duration">
                            <svg className="duration-icon" viewBox="0 0 24 24">
                                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                                <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                            </svg>
                            <span>Play Time:</span> <span>{`${data._doc.gameplayTime} min` || "Unknown"}
                            </span>
                        </p>
                        <p><span>Publisher:</span> {data.publisher.name || "Unknown"}</p>
                    </div>
                    <h1 className="title">Reviews:</h1>
                    {data.reviews.length === 0 ?
                        <p>No reviews</p>
                        :
                        data.reviews.map((review: any) => {
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
                </>}

        </div>
    )
}
