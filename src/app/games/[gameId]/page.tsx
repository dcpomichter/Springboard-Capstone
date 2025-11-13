"use client"
import Loading from "@/app/components/Loading";
import axios from "axios";
import { truncate } from "fs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function GameDetailsPage({ params }: any) {
    const router = useRouter()
    const [data, setData] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    const { gameId } = React.use(params)

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
                    <h1 className="text-2xl title-row title">{data.title}</h1>
                    <div className="game">
                        <p className="categories">
                            <span>Category:</span> <span className="category-tag">{data.category || "Unknown"}</span>
                        </p>
                        <p><span>Number of Player:</span> {data.numberOfPlayers || "Unknown"}</p>
                        <p className="duration">
                            <svg class="duration-icon" viewBox="0 0 24 24">
                                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                                <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                            </svg>
                            <span>Play Time:</span> <span>{`${data.gameplayTime} min` || "Unknown"}
                            </span>
                        </p>
                        <p><span>Publisher:</span> {data.publisher || "Unknown"}</p>
                    </div>
                </>}
        </div>
    )
}
